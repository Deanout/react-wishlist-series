# frozen_string_literal: true

ENV['RAILS_ENV'] ||= 'test'
require 'net/http'
require 'rails/test_help'

class ApiTestHelper
  # Post sign up request to api
  def api_sign_up(email, password, _client_id)
    uri = URI('http://localhost:3000/api/v1/users')
    http = Net::HTTP.new(uri.host, uri.port)
    request = Net::HTTP::Post.new(uri.path)
    request.set_form_data(
      {
        'email' => email,
        'password' => password,
        'client_id' => test_client_id
      }
    )
    http.request(request)
  end

  # Post sign in request to api
  def api_sign_in(grant_type, email, password, client_id, client_secret)
    uri = URI('http://localhost:3000/api/v1/oauth/token')
    http = Net::HTTP.new(uri.host, uri.port)
    request = Net::HTTP::Post.new(uri.path)
    request.set_form_data(
      {
        'grant_type' => grant_type,
        'email' => email,
        'password' => password,
        'client_id' => client_id,
        'client_secret' => client_secret
      }
    )
    http.request(request)
  end

  # Post sign out request to api
  def post_sign_out(token, client_id, client_secret)
    uri = URI('http://localhost:3000/api/v1/oauth/revoke')
    http = Net::HTTP.new(uri.host, uri.port)
    request = Net::HTTP::Post.new(uri.path)
    request.set_form_data(
      {
        'token' => token,
        'client_id' => client_id,
        'client_secret' => client_secret
      }
    )
    http.request(request)
  end

  # Set bearer token and access api end point
  def get_authorized_api_end_point(token, path)
    uri = URI(path)
    http = Net::HTTP.new(uri.host, uri.port)
    request = Net::HTTP::Get.new(uri.path)
    request.headers['Authorization'] = "Bearer #{token}"
    http.request(request)
  end
end
