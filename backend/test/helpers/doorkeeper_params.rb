# frozen_string_literal: true

module Helpers
  module DoorkeeperParams
    def oauth_token_params(user, application, grant_type = Doorkeeper.config.grant_flows.first)
      {
        grant_type: grant_type,
        email: user.email,
        password: user.password,
        client_id: application.uid,
        client_secret: application.secret
      }
    end

    def oauth_revoke_params(token, grant_type = 'token')
      {
        grant_type: grant_type,
        token: token.token,
        client_id: token.application.uid,
        client_secret: token.application.secret
      }
    end

    def oauth_refresh_token_params(token)
      {
        grant_type: 'refresh_token',
        refresh_token: token.refresh_token,
        client_id: token.application.uid,
        client_secret: token.application.secret
      }
    end

    def oauth_register_params(user, application)
      {
        email: user.email,
        password: user.password,
        client_id: application.uid
      }
    end
  end
end
