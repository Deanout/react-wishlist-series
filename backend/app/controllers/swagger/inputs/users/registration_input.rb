# frozen_string_literal: true

module Swagger
  module Inputs
    module Users
      class RegistrationInput
        include Swagger::Blocks

        swagger_component do
          schema :UserRegistrationInput do
            key :required, %i[email password client_id]

            property :email do
              key :type, :string
            end

            property :password do
              key :type, :string
            end

            property :client_id do
              key :type, :string
            end
          end
        end
      end
    end
  end
end
