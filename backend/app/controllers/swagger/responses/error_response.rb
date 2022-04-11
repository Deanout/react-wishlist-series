# frozen_string_literal: true

module Swagger
  module Responses
    class ErrorResponse
      include Swagger::Blocks

      swagger_component do
        schema :ErrorResponse do
          property :errors do
            key :type, :object
            property :email do
              key :type, :array
              items do
                key :type, :string
                key :example, 'can not be blank'
              end
            end
          end
        end
      end
    end
  end
end
