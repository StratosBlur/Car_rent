import React, { Component } from 'react'
import { 
  Route,
  Switch,
} from 'react-router-dom'

import Header from './header'
import Footer from './footer'
import NotFoundPage from './components/NotFound'
import Cars from './components/Cars/'
import Home from './components/Home'
import Users from './components/Users'
import Register from './components/Users/register'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/navigation.css'


 

class App extends Component {
  
 render() {
    return (
      <div>
      <Header/>
        <div className="App container">
          <br />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/cars" component={Cars}/>
            <Route path="/user" component={Users}/>
            <Route path="/reg" component={Register}/>
            <Route component={NotFoundPage}/>
          </Switch>
        </div>
      <Footer/>
        
      </div>
    )
  }
}

export default App