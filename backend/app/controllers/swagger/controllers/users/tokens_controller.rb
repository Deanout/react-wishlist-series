# frozen_string_literal: true

module Swagger
  module Controllers
    module Users
      class TokensController
        include Swagger::Blocks

        swagger_path '/oauth/token' do
          operation :post do
            key :summary, 'Login'
            key :description, 'Login and generate access & refresh tokens'
            key :operationId, 'userLogin'
            key :tags, [
              'user'
            ]

            request_body do
              key :required, true
              content :'application/json' do
                schema do
                  key :'$ref', :UserTokenInput
                end
              end
            end

            response 200 do
              key :description, 'Successfull response'
              content :'application/json' do
                schema do
                  key :'$ref', :UserTokenSuccessResponse
                end
              end
            end

            response 401 do
              key :description, 'Error response'
              content :'application/json' do
                schema do
                  key :'$ref', :UserTokenErrorResponse
                end
              end
            end
          end
        end

        swagger_path '/oauth/revoke' do
          operation :post do
            key :summary, 'Logout'
            key :description, 'Logout and revoke tokens'
            key :operationId, 'userLogout'
            key :tags, [
              'user'
            ]

            request_body do
              key :required, true
              content :'application/json' do
                schema do
                  key :'$ref', :UserLogoutInput
                end
              end
            end

            response 200 do
              key :description, 'This endpoint returns 200 for every requests'
            end
          end
        end
      end
    end
  end
end
