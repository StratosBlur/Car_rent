import React, { Component } from 'react'
import { 
  Route,
  Switch,
  Link
 } from 'react-router-dom'



import NotFoundPage from './components/NotFound'

import Cars from './components/Cars/'
import Home from './components/Home'

import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/navigation.css'

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';





class App extends Component {
  


  constructor(props){
    
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = {
      isOpen: false
    };
    
  }
  
  toggle(){
    this.setState({
      isOpen:false
    })
  }
  
  
  render() {
    return (
      <div>
      <Navbar  light expand="md" className="Navbar sticky-top"  >
        <NavbarBrand>
          <Link to="/" >
            <img style={{width:'15%' , height:'100' ,paddingRight:'5%'}} alt="logo" src="http://www.mauriclick.com/images/media/car-rent.png"/>
            Car Rent
          </Link>
        </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
              <Link to="/"><NavLink>Manage Booking</NavLink></Link>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Member
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    เข้าสู่ระบบ
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    สมัครสมาชิก
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
        <div className="App container">
          <br />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/cars" component={Cars}/>
            <Route component={NotFoundPage}/>
            
        
          </Switch>
        </div>
      <div className="App container">
        <br/>
        <hr />
          Developer : <a href="https://facebook.com/waveblur">WaveBlur</a>
        <hr/>
      </div>
        
      </div>
    )
  }
}

export default App