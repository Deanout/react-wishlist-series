# frozen_string_literal: true

module Api
  module V1
    module Users
      class RegistrationsController < ApiController
        skip_before_action :doorkeeper_authorize!, only: %i[create]

        include DoorkeeperRegisterable

        def create
          client_app = Doorkeeper::Application.find_by(uid: params[:client_id])
          unless client_app
            return render json: { error: 'Client Not Found. Check Provided Client Id.' },
                          status: :unauthorized
          end

          allowed_params = user_params.except(:client_id)
          user = User.new(allowed_params)

          if user.save
            render json: render_user(user, client_app), status: :ok
          else

            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
          end
        end

        def update_profile
          user = current_user

          client_app = Doorkeeper::Application.find_by(uid: params[:client_id])
          unless client_app
            return render json: { error: 'Client Not Found. Check Provided Client Id.' },
                          status: :unauthorized
          end
          allowed_params = user_params.except(:client_id, :client_secret)

          # If email or password are not provided, use existing email and password
          allowed_params[:email] = user.email if allowed_params[:email].blank?
          allowed_params[:password] = user.password if allowed_params[:password].blank?

          if user.update_with_password(allowed_params)
            render json: render_user(user, client_app), status: :ok
          else
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
          end
        end

        private

        def user_params
          params.permit(:email, :password, :current_password, :client_id)
        end
      end
    end
  end
end
