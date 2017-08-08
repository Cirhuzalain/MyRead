import React from 'react'
import Book from './Book'

/**
*@description BookShelf componeent
*@param props
*/
function BookShelf(props){
  const {title, bookOnShelf, onShelfChange} = props
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {bookOnShelf.map((book) => (
            <Book key={book._titleId} bookInfo={book} onShelfChange={onShelfChange}/>
          ))}
        </ol>
      </div>
    </div>
  )
}

export default BookShelf
