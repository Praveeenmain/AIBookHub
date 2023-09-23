import './App.css'

import {Route, Switch} from 'react-router-dom'

import {Component} from 'react'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import AiChatBot from './components/AIChatbot'
import Home from './components/Home'
import Bookshelves from './components/Bookshelves'
import Item from './components/BookDetails'
import NotFound from './components/PageNotFound'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/chatbot" component={AiChatBot}/>
        <ProtectedRoute exact path="/shelf" component={Bookshelves}/>
        <ProtectedRoute exact path="/books/:id" component={Item}/>
        <NotFound/>

      </Switch>
    )
  }
}

export default App
