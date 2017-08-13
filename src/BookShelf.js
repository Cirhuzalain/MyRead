import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

/**
*@description BookShelf component
*@param props
*/
const BookShelf = (props) => {
  const {title, bookOnShelf, onShelfChange} = props
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {bookOnShelf.map((book) => (
            <Book key={book._titleId} bookInfo={book} onShelfChange={onShelfChange} />
          ))}
        </ol>
      </div>
    </div>
  )
}

BookShelf.propTypes = {
  title: PropTypes.string.isRequired,
  bookOnShelf: PropTypes.array.isRequired,
  onShelfChange: PropTypes.func.isRequired
}

export default BookShelf
