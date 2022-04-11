# frozen_string_literal: true

FactoryBot.define do
  # Create a book with a title and a body
  factory :book do
    title { Faker::Book.title }
    body { Faker::Lorem.paragraph }
  end
end
