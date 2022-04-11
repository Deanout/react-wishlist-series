# frozen_string_literal: true

require 'test_helper'

module Api
  module V1
    class BooksControllerTest < ActionDispatch::IntegrationTest
      setup do
        @book = books(:one)
        create(:doorkeeper_application)
        access_token = create(:doorkeeper_access_token).token
        @token = "Bearer #{access_token}"
      end

      test 'should get index' do
        get(api_v1_books_url, headers: { 'Authorization' => @token })
        assert_response :success
      end

      test 'should not get index if signed out' do
        get(api_v1_books_url, headers: { 'Authorization' => nil })
        assert_response :unauthorized
      end

      test 'should get new' do
        get(new_api_v1_book_url, headers: { 'Authorization' => @token })
        assert_response :success
      end

      test 'should create book' do
        assert_difference('Book.count') do
          post api_v1_books_url,
               params: { book: { body: @book.body, title: @book.title } },
               headers: { 'Authorization' => @token }
        end
        assert_redirected_to api_v1_book_url(Book.last)
      end

      test 'should show book' do
        get api_v1_book_url(@book), headers: { 'Authorization' => @token }
        assert_response :success
      end

      test 'should get edit' do
        get edit_api_v1_book_url(@book), headers: { 'Authorization' => @token }
        assert_response :success
      end

      test 'should update book' do
        patch api_v1_book_url(@book),
              params: { book: { body: @book.body, title: @book.title } },
              headers: { 'Authorization' => @token }
        assert_redirected_to api_v1_book_url(@book)
      end

      test 'should destroy book' do
        assert_difference('Book.count', -1) do
          delete api_v1_book_url(@book),
                 headers: { 'Authorization' => @token }
        end

        assert_redirected_to api_v1_books_url
      end
    end
  end
end
