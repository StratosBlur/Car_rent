import React, { Component } from 'react'
import { 
  Route,
  Switch,
  Link
 } from 'react-router-dom'

import Home from './components/Home'
import NotFoundPage from './components/NotFound'
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

  const logo = {
    width:42,
    height:42
  }

  const text_logo = {
    'font-size' : '25px'

  }

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
      <Navbar  light expand="md">
      <NavbarBrand>
        <Link to="/" >
        
        <ul styles={{ 'list-style-type': 'none' }}>
          <li style={{float:'left'}}><img style={logo} alt="logo" src="https://cdn4.iconfinder.com/data/icons/dot/256/parking_locked.png"/></li>
          <li><div style={text_logo}>Car Rent</div></li>
        </ul>
          
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
            <Route component={NotFoundPage}/>
        
          </Switch>
        </div>
      
        
      </div>
    )
  }
}

export default App