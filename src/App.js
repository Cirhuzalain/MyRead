import React from 'react'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBook from './Search'
import keyIndex from 'react-key-index'
import * as BooksAPI from './BooksAPI'
import './App.css'

/**
*Main component responsible for showing different component
*base on which route the user visit and
*handling book shelf change
*/
class BooksApp extends React.Component {

  state = {
    books: []
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
  changeShelf = (book, shelf = book.shelf) => {
    BooksAPI.update(book, shelf).then(response => {

      let newShelf = []
      const stateIds = this.state.books.map(bookinfo => bookinfo.id)

      //check if we have a new book
      if (stateIds.indexOf(book.id) === -1) {
        newShelf.push(book)
      }

      this.setNewShelf(response)

      if(newShelf.length > 0){
        this.setState({'books': this.state.books.concat([newShelf[0]]) })
      } else {
        this.setState({'books': this.state.books })
      }

    }).catch(error => this.setState({'books' : []}))
  }

  /**
  *@description set book shelf
  *@param data
  */
  setNewShelf(data) {
    for (let shelf in data) {
      data[shelf].map(id => {
        this.state.books.map(bookshelf => {
          if (bookshelf.id === id && bookshelf.shelf !== shelf) {
            bookshelf.shelf = shelf
          }
          return bookshelf
        })
        return id
      })

    }
  }

  /**
  *@description render Component base on which route the user is visiting
  */
  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks onShelfChange={this.changeShelf} books={keyIndex(this.state.books, 1)} />
        )}/>
        <Route path='/search' render={() => (
          <SearchBook onShelfChange={this.changeShelf} books={this.state.books} />
        )}/>
      </div>
    )
  }
}

export default BooksApp
