# frozen_string_literal: true

FactoryBot.define do
  factory :doorkeeper_access_token, class: 'Doorkeeper::AccessToken' do
    association :application, factory: :doorkeeper_application
    expires_in { 1.hour }
    resource_owner_id { create(:user).id }
    refresh_token do
      loop do
        # generate a random token string and return it
        # unless there is already another token with the same string
        token = SecureRandom.hex(32)
        break token unless Doorkeeper::AccessToken.exists?(refresh_token: token)
      end
    end
  end
end
