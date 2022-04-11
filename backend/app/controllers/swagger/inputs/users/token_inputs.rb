# frozen_string_literal: true

module Swagger
  module Inputs
    module Users
      class TokenInputs
        include Swagger::Blocks

        swagger_component do
          schema :UserTokenInput do
            key :required, %i[grant_type email password client_id client_secret]

            property :grant_type do
              key :type, :string
              key :example, 'password'
            end

            property :email do
              key :type, :string
            end

            property :password do
              key :type, :string
            end

            property :client_id do
              key :type, :string
            end

            property :client_secret do
              key :type, :string
            end
          end

          schema :UserLogoutInput do
            key :required, %i[token client_id client_secret]

            property :token do
              key :type, :string
              key :example, 'access token or refresh token'
            end

            property :client_id do
              key :type, :string
            end

            property :client_secret do
              key :type, :string
            end
          end
        end
      end
    end
  end
end
