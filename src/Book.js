import React from 'react'
import PropTypes from 'prop-types'


/**
*@description Book component
*@param props
*/
const Book = (props) => {
  const { bookInfo, onShelfChange } = props
  return (
    <li key={bookInfo._languageId}>
      <div className="book">
        <div className="book-top">
          {bookInfo.imageLinks && (
            <div className="book-cover" style={{
              width: 128,
              height: 188,
              backgroundImage: `url(${bookInfo.imageLinks.thumbnail})` }}>
            </div>
          )}
          <div className="book-shelf-changer">
            <select value={bookInfo.shelf} onChange={(event) => onShelfChange(bookInfo, event.target.value)}>
              <option disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        {bookInfo.title && <div className="book-title">{bookInfo.title}</div>}
        {bookInfo.authors && bookInfo.authors.map(name => (
          <div key={name} className="book-authors">{name}</div>
        ))}
      </div>
    </li>
  )
}

Book.propTypes = {
  bookInfo: PropTypes.object.isRequired,
  onShelfChange: PropTypes.func.isRequired
}

export default Book
