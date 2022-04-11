# frozen_string_literal: true

module Swagger
  module Responses
    module Users
      class RegistrationResponses
        include Swagger::Blocks

        swagger_component do
          schema :UserRegistrationSuccessResponse do
            key :type, :object
            key :required, %i[id access_token token_type expires_in refresh_token created_at]

            property :id do
              key :type, :string
              key :format, :uuid
            end

            property :access_token do
              key :type, :string
            end

            property :token_type do
              key :type, :string
            end

            property :expires_in do
              key :type, :integer
            end

            property :refresh_token do
              key :type, :string
            end

            property :created_at do
              key :type, :integer
            end
          end

          schema :UserRegistrationInvalidClientResponse do
            key :type, :object
            key :required, %i[error error_description]

            property :error do
              key :type, :string
            end

            property :error_description do
              key :type, :string
            end
          end
        end
      end
    end
  end
end
