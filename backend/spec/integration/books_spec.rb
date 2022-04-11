# frozen_string_literal: true

require 'swagger_helper'
require 'rails_helper'

# Describe the books API
describe 'Books API' do # rubocop:disable Metrics/BlockLength
  before do
    @token = "Bearer #{create(:doorkeeper_access_token).token}"
    @book = create(:book).attributes
  end
  # GET /books
  # Get all books
  path '/api/v1/books' do
    get 'Get all books' do
      tags 'Books'
      security [Bearer: []]
      parameter name: :Authorization, in: :header, type: :string, required: true,
                description: 'Authorization token'
      response '200', 'books found' do
        let(:Authorization) { @token }
        run_test!
      end
      response '401', 'unauthorized' do
        let(:Authorization) { 'invalid' }
        run_test!
      end
    end
  end

  # GET /books/:id
  # Get a book by id
  path '/api/v1/books/{id}' do
    get 'Get a book' do
      tags 'Books'
      security [Bearer: []]
      parameter name: :Authorization, in: :header, type: :string, required: true,
                description: 'Authorization token'
      parameter name: :id, in: :path, type: :string, required: true,
                description: 'ID of the book'
      response '200', 'book found' do
        let(:Authorization) { @token }
        let(:id) { @book['id'] }
        run_test!
      end
      response '404', 'book not found' do
        let(:Authorization) { @token }
        let(:id) { 'invalid' }
        run_test!
      end
      response '401', 'unauthorized' do
        let(:Authorization) { 'invalid' }
        let(:id) { @book['id'] }
        run_test!
      end
    end
  end

  # POST /books
  # Create a book
  path '/api/v1/books' do
    post 'Create a book' do
      tags 'Books'
      consumes 'application/json', 'application/xml'
      security [Bearer: []]
      parameter name: :Authorization, in: :header, type: :string, required: true,
                description: 'Authorization token'
      parameter name: :book, in: :body, schema: {
        type: :object,
        properties: {
          book: {

            title: { type: :string },
            body: { type: :string }
          }
        },
        required: %w[title body]
      }
      response '302', 'redirected' do
        let(:Authorization) { @token }
        let(:book) { { title: 'The Hobbit', body: 'A great book' } }
        run_test!
      end
      response '401', 'unauthorized' do
        let(:Authorization) { 'invalid' }
        let(:book) { { book: attributes_for(:book) } }
        run_test!
      end
    end
  end
end
