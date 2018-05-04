import React, { Component } from 'react'
import { 
  Route,
  Switch,
  Link
 } from 'react-router-dom'

import Home from './components/Home'
import NotFoundPage from './components/NotFound'




class App extends Component {
  render() {
    return (
      <div className="App container">
      
      <Switch>
        <Route exact path="/" component={Home} />
        <Route component={NotFoundPage}/>
        
      </Switch>
        
      </div>
    )
  }
}

export default App