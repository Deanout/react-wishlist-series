# frozen_string_literal: true

require 'test_helper'

class UserTest < ActiveSupport::TestCase
  test 'have a valid factory' do
    assert build(:user).valid?
  end
end
