import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

/**
*Book shelf component responsible for displaying the main page
*/
class BookShelf extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    onShelfChange: PropTypes.func.isRequired
  }

  /**
  *@description render BookShelf component UI
  */
  render() {
    const { books, onShelfChange } = this.props

    let read, currentlyReading, wantToRead

    read = books.filter((book) => book.shelf === 'read')
    currentlyReading = books.filter((book) => book.shelf === 'currentlyReading')
    wantToRead = books.filter((book) => book.shelf === 'wantToRead')

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {currentlyReading.map((book) => (
                    <li key={book.id}>
                      <div className="book">
                        <div className="book-top">
                          <div className="book-cover" style={{
                            width: 128,
                            height: 188,
                            backgroundImage: `url(${book.imageLinks.thumbnail})` }}>
                          </div>
                          <div className="book-shelf-changer">
                            <select value={book.shelf} onChange={(event) => onShelfChange(book, event.target.value)}>
                              <option disabled>Move to...</option>
                              <option value="currentlyReading">Currently Reading</option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                          {book.authors.map(name => (
                            <div key={name} className="book-authors">{name}</div>
                          ))}
                      </div>
                    </li>))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {wantToRead.map((book) => (
                    <li key={book.id}>
                      <div className="book">
                        <div className="book-top">
                          <div className="book-cover" style={{
                            width: 128,
                            height: 188,
                            backgroundImage: `url(${book.imageLinks.thumbnail})` }}>
                          </div>
                          <div className="book-shelf-changer">
                            <select value={book.shelf} onChange={(event) => onShelfChange(book, event.target.value)}>
                              <option disabled>Move to...</option>
                              <option value="currentlyReading">Currently Reading</option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                          {book.authors.map(name => (
                            <div key={name} className="book-authors">{name}</div>
                          ))}
                      </div>
                    </li>))}
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                <ol className="books-grid">
                  {read.map((book) => (
                    <li key={book.id}>
                      <div className="book">
                        <div className="book-top">
                          <div className="book-cover" style={{
                            width: 128,
                            height: 188,
                            backgroundImage: `url(${book.imageLinks.thumbnail})` }}>
                          </div>
                          <div className="book-shelf-changer">
                            <select value={book.shelf} onChange={(event) => onShelfChange(book, event.target.value)}>
                              <option disabled>Move to...</option>
                              <option value="currentlyReading">Currently Reading</option>
                              <option value="wantToRead">Want to Read</option>
                              <option defaultValue="true" value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                          {book.authors.map(name => (
                            <div key={name} className="book-authors">{name}</div>
                          ))}
                      </div>
                    </li> ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="open-search">
            <Link to='/search'>Add a book</Link>
          </div>
        </div>
      )
    }
}

export default BookShelf
