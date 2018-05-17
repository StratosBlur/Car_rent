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
import Book from './components/Cars/book'
import detail from './components/Cars/car'
import Employee from './components/employees/'
import deletebook from './components/employees/deletebook'
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
            <Route path="/book" component={Book} />
            <Route path="/emp" component={Employee}/>
            <Route path="/car/:Car_id" component={detail} />
            <Route path="/delete/:email" component={deletebook} />
            <Route component={NotFoundPage}/>
          </Switch>
        </div>
      <Footer/>
        
      </div>
    )
  }
}

export default App