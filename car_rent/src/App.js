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
import booked from './components/Cars/booked'
import paid from './components/Cars/paid'
import renting from './components/employees/renting' 
import mgt from './components/mgt/index'
import staff from './components/mgt/staff'
import delete_staff from './components/mgt/delete'
import addstaff from './components/mgt/add'
import delete_car from './components/mgt/delete_car'
import reviews from './components/Review/index'
import take from './components/employees/take'
import maintain from './components/employees/maintain'
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
            <Route path="/addstaff" component={addstaff}/>
            <Route path="/admin" component={mgt}/>
            <Route path="/cars" component={Cars}/>
            <Route path="/user" component={Users}/>
            <Route path="/reg" component={Register}/>
            <Route path="/book" component={Book} />
            <Route path="/emp" component={Employee}/>
            <Route path="/car/:Car_id" component={detail} />
            <Route path="/delete_car/:Car_id" component={delete_car}/>
            <Route path="/delete/:email" component={deletebook} />
            <Route path="/booked/:Car_id/:cost/:startdate/:day" component={booked}/>
            <Route path="/paid/:email" component={paid}/>
            <Route path="/renting/:email" component={renting}/>
            <Route path="/staff/:email" component={staff}/>
            <Route path="/staff/delete/:email" component={delete_staff} />
            <Route path="/reviews/" component={reviews}/>
            <Route path="/take/:email" component={take}/>
            <Route path="/maintain/:email" component={maintain}/>
            
            <Route component={NotFoundPage}/>
          </Switch>
        </div>
      <Footer/>
        
      </div>
    )
  }
}

export default App