# frozen_string_literal: true

require 'test_helper'

module Doorkeeper
  class TokensControllerTest < ActionDispatch::IntegrationTest
    def setup
      @user = create(:user)
      @application = create(:doorkeeper_application)
      @token = create(:doorkeeper_access_token, resource_owner_id: @user.id)
    end

    test 'should generate a new oauth access token' do
      assert_difference('Doorkeeper::AccessToken.count') do
        post(oauth_token_url,
             params: oauth_token_params(@user, @application),
             as: :json)
      end

      assert_response :success
    end

    test 'should not generate a new oauth access token with wrong user information' do
      invalid_user = build(:user)

      assert_no_difference('Doorkeeper::AccessToken.count') do
        post(oauth_token_url,
             params: oauth_token_params(invalid_user, @application),
             as: :json)
      end

      assert_response :bad_request
    end

    test 'should generate access token with refresh token' do
      assert_difference('Doorkeeper::AccessToken.count') do
        post(oauth_token_url,
             params: oauth_refresh_token_params(@token),
             as: :json)
      end

      assert_response :success
    end

    test 'should revoke access token' do
      assert_changes -> { @token.revoked_at } do
        post(oauth_revoke_url,
             params: oauth_revoke_params(@token),
             as: :json)

        @token.reload
      end

      assert_response :success
    end
  end
end
