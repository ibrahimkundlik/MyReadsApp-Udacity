import React from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import SearchPage from './Components/SearchPage'
import MainPage from './Components/MainPage'

class BooksApp extends React.Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={MainPage}/>
        <Route path="/search-page" component={SearchPage}/>
      </div>
    )
  }
}

export default BooksApp
