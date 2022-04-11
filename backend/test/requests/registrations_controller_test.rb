# frozen_string_literal: true

require 'test_helper'

module Users
  class RegistrationsControllerTest < ActionDispatch::IntegrationTest
    def setup
      @application = create(:doorkeeper_application)
    end

    test 'should create an user then generate access token' do
      user = build(:user)

      assert_difference(['Doorkeeper::AccessToken.count', 'User.count'], 1) do
        post(api_v1_user_registration_url,
             params: oauth_register_params(user, @application),
             as: :json)
      end

      assert_response :success
    end
  end
end
