import React, { Component } from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'

/**
*SearchBook component responsible for book search
*/
class SearchBook extends Component {

  /**
  *@description SearchBook constructor
  *@param {props}
  */
  constructor(props){
    super(props)
    this.state = {
      searchResults: [],
    }
    this.searchInfo = debounce(this.searchBook, 300)
  }

  static propTypes = {
    books: PropTypes.array.isRequired,
    onShelfChange: PropTypes.func.isRequired
  }

  /**
  *@description Search book base on the user input
  *@param {string} bookInfo user query
  */
  searchBook(bookInfo){
    const search = bookInfo.trim()

    if (search !== ''){
      BooksAPI.search(search, 25).then(response => {
        if (!!response && !response.error) {
          let uniqueResults = []
          for(let bookInfo of response){

            //set appropriate book shelf base on current shelf state
            const bookOnShelf = this.props.books.filter((item, index, data) => item.id === bookInfo.id)

            if (bookOnShelf.length === 1) {
              bookInfo.shelf = bookOnShelf[0].shelf
            } else {
              bookInfo.shelf = ''
            }

            //remove duplicate book
            let i = uniqueResults.find(tmp => tmp.id === bookInfo.id)

            if(!i){
              uniqueResults.push(bookInfo)
            }
          }

          this.setState({'searchResults' : uniqueResults })
        }
      }).catch(error => this.setState({'searchResults' : [] }))
    }
  }

  /**
  *@description Change book shelf on search page
  *@param {book}
  *@param {shelf} bookshelf
  */
  changeShelf(book, shelf){
    book.shelf = shelf
    this.setState({'searchResults' : this.state.searchResults})
    this.props.onShelfChange(book, shelf)
  }

  /**
  *@description render search component UI
  */
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
        <Link to='/' className='close-search'>Close</Link>
        <div className="search-books-input-wrapper">
          <input onChange={(event) => this.searchInfo(event.target.value)}
                  type="text" placeholder="Search by title or author"/>
        </div>
      </div>
      <div className="search-books-results">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Search Results</h2>
            <div className="bookshelf-books">
            <ol className="books-grid">
              {this.state.searchResults.map(book => (
                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      {book.imageLinks && (
                        <div className="book-cover" style={{
                          width: 128,
                          height: 188,
                          backgroundImage: `url(${book.imageLinks.thumbnail})` }}>
                        </div>
                      )}
                      <div className="book-shelf-changer">
                      <select value={book.shelf} onChange={(event) => this.changeShelf(book, event.target.value)}>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="">None</option>
                      </select>
                    </div>
                  </div>
                  {book.title && <div className="book-title">{book.title}</div>}
                  {book.authors && book.authors.map(name => (
                    <div key={name} className="book-authors">{name}</div>
                  ))}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  </div>)
  }
}

export default SearchBook
