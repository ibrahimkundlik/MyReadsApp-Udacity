import React from 'react'
import Books from './Books'

class Shelf extends React.Component {
	render() {
		return (
			<div className="bookshelf">
			  <h2 className="bookshelf-title">{this.props.name}</h2>
			    <div className="bookshelf-books">
			      <ol className="books-grid">
			        {
			        	this.props.books.map((b, k) => <Books updateBook={this.props.updateBook} book={b} key={k} />)
			        }
			      </ol>
			  </div>
			</div>
		)
	}
}

export default Shelf
