import React from 'react'

/**
*@description Book componeent
*@param props
*/
function Book(props){
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

export default Book
