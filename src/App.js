import React from 'react'
import { Route } from 'react-router-dom'
import BookShelf from './ListBooks'
import SearchBook from './Search'
import * as BooksAPI from './BooksAPI'
import './App.css'

/**
*Main component responsible for showing different component
*base on which route the user visit and
*handling book shelf change
*/
class BooksApp extends React.Component {

  /**
  *@description Books app constructor
  *@param {props}
  */
  constructor(props){
    super(props)

    this.state = {
      books: []
    }
  }

  /**
  *@description excuting the ajax request after the component being append to the DOM
  */
  componentDidMount() {
    BooksAPI.getAll().then((books) => this.setState({ books }))
      .catch(error => this.setState({'books' : []}))
  }

  /**
  *@description Change book shelf
  *@param {book}
  *@param {shelf} bookshelf
  */
  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(response => {
      const currentlyReading = response.currentlyReading
      const read = response.read
      const wantToRead = response.wantToRead

      let newShelf = []
      const stateIds = this.state.books.map(bookinfo => bookinfo.id)

      if (stateIds.indexOf(book.id) === -1) {
        book.shelf = shelf
        newShelf.push(book)
      }

      for (let id of currentlyReading) {
        for (let bookshelf of this.state.books) {
          if (bookshelf.id === id && bookshelf.shelf !== 'currentlyReading') {
            bookshelf.shelf = 'currentlyReading'
          }
        }
      }
      for (let id of read) {
        for (let bookshelf of this.state.books) {
          if (bookshelf.id === id && bookshelf.shelf !== 'read') {
            bookshelf.shelf = 'read'
          }
        }
      }
      for (let id of wantToRead) {
        for (let bookshelf of this.state.books) {
          if (bookshelf.id === id && bookshelf.shelf !== 'wantToRead') {
            bookshelf.shelf = 'wantToRead'
          }
        }
      }
      if(newShelf.length > 0){
        this.setState({'books': this.state.books.concat([newShelf[0]]) })
      } else {
        this.setState({'books': this.state.books })
      }

    }).catch(error => this.setState({'books' : []}))
  }

  /**
  *@description render Component base on which route the user is visiting
  */
  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <BookShelf onShelfChange={this.changeShelf} books={this.state.books} />
        )}/>
        <Route path='/search' render={() => (
          <SearchBook onShelfChange={this.changeShelf} books={this.state.books} />
        )}/>
      </div>
    )
  }
}

export default BooksApp
