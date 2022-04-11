# frozen_string_literal: true

module Swagger
  module Controllers
    module Users
      class RegistrationsController
        include Swagger::Blocks

        swagger_path '/users' do
          operation :post do
            key :summary, 'Register'
            key :description, 'Register and generate access & refresh tokens'
            key :operationId, 'userRegister'
            key :tags, [
              'user'
            ]

            request_body do
              key :required, true
              content :'application/json' do
                schema do
                  key :'$ref', :UserRegistrationInput
                end
              end
            end

            response 200 do
              key :description, 'Successfull response'
              content :'application/json' do
                schema do
                  key :'$ref', :UserRegistrationSuccessResponse
                end
              end
            end

            response 422 do
              key :description, 'Error response'
              content :'application/json' do
                schema do
                  key :'$ref', :ErrorResponse
                end
              end
            end

            response 401 do
              key :description, 'Invalid client response'
              content :'application/json' do
                schema do
                  key :'$ref', :UserRegistrationInvalidClientResponse
                end
              end
            end
          end
        end
      end
    end
  end
end
