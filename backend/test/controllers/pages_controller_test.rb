# frozen_string_literal: true

require 'test_helper'

class PagesControllerTest < ActionDispatch::IntegrationTest
  setup do
    create(:doorkeeper_application)
  end
  test 'should get home' do
    get root_path
    assert_response :success
  end
end
