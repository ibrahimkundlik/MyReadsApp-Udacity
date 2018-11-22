import React from 'react'
import * as BooksAPI from '../BooksAPI'
import { Link } from 'react-router-dom'
import Books from './Books'

class SearchPage extends React.Component {
	state = {
    	books: [],
    	results: [],
    	query: ""
    }

    componentDidMount() {
        BooksAPI.getAll()
            .then(resp => {
            this.setState({ books: resp })
        });
    }

    updateQuery = (q) => {
    	this.setState({query: q}, this.searchBooks)
    }

    searchBooks() {
    	if(this.state.query === '' || this.state.query === undefined) {
    		return this.setState({ results: [] })
    	}
    	BooksAPI.search(this.state.query.trim())
    	.then(resp => {
    		if(resp.error) {
    			return this.setState({ results: [] })
    		}
    		else {
    			resp.forEach(notSelectedBook => {
    			let selected = this.state.books.filter(Book => Book.id === notSelectedBook.id)
    			selected.map((e) => {
    				return notSelectedBook.shelf = e.shelf
    			})
    		})
    		}
    		this.setState({results: resp})
    	})
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
			<div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
                <input 
                	type="text" 
                	placeholder="Search by title or author" 
                	value={this.state.query}
                	onChange={(event) => this.updateQuery(event.target.value)}
                />
              </div>
            </div>
            <div className="search-books-results">
	          <ol className="books-grid">
	          	{ this.state.query !== "" && this.state.results.map((b, k) => <Books updateBook={this.updateBook} book={b} key={k} />) }
	          </ol>
            </div>
            </div>
		)
	}
}

export default SearchPage