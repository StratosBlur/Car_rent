import React , {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'universal-cookie'
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
    DropdownItem } from 'reactstrap'
const cookie = new Cookies()

export default class Header extends Component {
    constructor(props){
    
        super(props)
        this.toggle = this.toggle.bind(this)
        this.state = {
          isOpen: false,
          
        };
        this.logoutSubmit = this.logoutSubmit.bind(this)
    }

    logoutSubmit(event){
      event.preventDefault()
      cookie.remove('email')
      cookie.remove('car_id')
    }
    toggle(){
        this.setState({
          isOpen:false
        })
      }

    render(){
      if(cookie.get('email') != null){
        const email = cookie.get('email')
        return (
          (
             <header> 
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
                        <NavLink>
                           Account : <label>{email}</label>
                        </NavLink>
                        </NavItem>
                        <NavItem>
                        <Link to="/reviews"><NavLink>Reviews</NavLink></Link>
                        </NavItem>
                        <NavItem>
                        <Link to="/book"><NavLink>Manage Booking and Renting</NavLink></Link>
                        </NavItem>
                        <NavItem onClick={this.logoutSubmit}>
                        <Link to="/user"><NavLink>Logout</NavLink></Link>
                        </NavItem>
                      </Nav>
                    </Collapse>
                  </Navbar>
              </header>
            )
      )
      }else {
        return (
          (
             <header> 
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
                        
                        <UncontrolledDropdown nav inNavbar>
                          <DropdownToggle nav caret>
                            Member
                          </DropdownToggle>
                          <DropdownMenu right>
                          <Link to="/user">
                          <DropdownItem>
                              เข้าสู่ระบบ
                          </DropdownItem>
                            </Link>
                            <DropdownItem divider />
                            <Link to="/reg">
                            <DropdownItem>
                              สมัครสมาชิก
                            </DropdownItem>
                            </Link>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </Nav>
                    </Collapse>
                  </Navbar>
              </header>
            )
      )
      }
        
    }
}

