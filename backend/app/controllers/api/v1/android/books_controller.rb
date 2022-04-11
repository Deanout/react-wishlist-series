# frozen_string_literal: true

module Api
  module V1
    module Android
      class BooksController < ApiController
        include ApplicationHelper
        before_action :set_book, only: %i[show]
        before_action :is_admin?

        # GET /books or /books.json
        def index
          @books = Book.all
          render json: @books
        end

        # GET /books/1 or /books/1.json
        def show
          render json: @book
        end

        private

        # Use callbacks to share common setup or constraints between actions.
        def set_book
          @book = Book.find(params[:id])
        end

        # Only allow a list of trusted parameters through.
        def book_params
          params.require(:book)
        end
      end
    end
  end
end
