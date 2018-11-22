import React from 'react'
import * as BooksAPI from '../BooksAPI'
import { Link } from 'react-router-dom'
import Shelf from './Shelf'

class MainPage extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll()
    .then(resp => {
      this.setState({ books: resp })
    });
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
    .then(resp => {
      book.shelf = shelf
      this.setState(state => ({
        books: this.state.books.filter(b => b.id !== book.id).concat([book])
      }));
    });
  }

	render() {
		return (
      <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads: Book Tracking App</h1>
            </div>
            <div className="list-books-content">
              <div>
                {<Shelf updateBook={this.updateBook} name="Currently Reading" books={this.state.books.filter(b => b.shelf === 'currentlyReading')} />}
                {<Shelf updateBook={this.updateBook} name="Want To Read" books={this.state.books.filter(b => b.shelf === 'wantToRead')} />}
                {<Shelf updateBook={this.updateBook} name="Read" books={this.state.books.filter(b => b.shelf === 'read')} />}
              </div>
            </div>
            <div className="search-page">
                <Link to="/search-page" className="open-search">Add a book</Link>
            </div>
      </div>
		)
	}
}

export default MainPage