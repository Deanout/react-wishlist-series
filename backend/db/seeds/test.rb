# frozen_string_literal: true

if Doorkeeper::Application.count.zero?
  Doorkeeper::Application.create!(name: 'React Client', redirect_uri: '', scopes: '')

end
