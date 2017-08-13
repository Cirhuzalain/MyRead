import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom'

/**
*Book shelf component responsible for displaying the main page
*/
class ListBooks extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    onShelfChange: PropTypes.func.isRequired
  }

  /**
  *@description render BookShelf component UI
  */
  render() {
    const { onShelfChange, books } = this.props

    const read = books.filter((book) => book.shelf === 'read')
    const currentlyReading = books.filter((book) => book.shelf === 'currentlyReading')
    const wantToRead = books.filter((book) => book.shelf === 'wantToRead')

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf
              bookOnShelf={currentlyReading}
              title="Currently Reading"
              onShelfChange={onShelfChange} />

            <BookShelf
              bookOnShelf={wantToRead}
              title="Want To Read"
              onShelfChange={onShelfChange} />

            <BookShelf
              bookOnShelf={read}
              title="Read"
              onShelfChange={onShelfChange} />
            </div>
          </div>
          <div className="open-search">
            <Link to='/search'>Add a book</Link>
          </div>
        </div>
      )
    }
}

export default ListBooks
