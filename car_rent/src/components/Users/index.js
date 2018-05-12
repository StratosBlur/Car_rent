import React , { Component } from 'react'
import {Button ,Input , FormGroup  } from 'reactstrap'
import Cookies from 'universal-cookie'
import {Link} from 'react-router-dom'
import fetch from 'isomorphic-fetch'
import PropTypes from 'prop-types'
const cookie = new Cookies()

class Users extends Component {
    
    
    constructor(props){
        
        super(props)
        this.state = {
            email : "",
            password : "",
            redirect : false,
            alert: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        
    }
    
    componentWillMount(){
       
    }
    handleChange(event){
        event.preventDefault()
        const target = event.target
        const value = target.value
        const name = target.name
        this.setState({
            [name] : value
        })
    }
    handleSubmit(event){
        const { email , password } = this.state
        var url = "http://localhost:1222/api/cus/login/"+email+"/"+password
        fetch(url)
            .then(Response => Response.json())
            .then((data)=> {
                
                if(data.length >= 1){
                     cookie.set('email' , email , {path : '/'})
                     this.props.history.push('/')
                     
                }else {
                    this.setState({
                        alert : "ข้อมูลไม่ถูกต้อง !"
                    }) 
                }
            })
               
        event.preventDefault()  
    }
    
    componentDidMount(){}
    
    
    render(){
        
        const { email , password , alert} = this.state
        return (
            <div className="row">
                <div className="col"></div>
                <div className="col">
                <div className="jumbotron" style={{ backgroundColor : 525450}}>
                    
                    <FormGroup>
                        <label>Email</label>
                        <Input type="text" name="email" required value={email}  onChange={this.handleChange}/>
                     </FormGroup>
                    <FormGroup>
                        <label>Password</label>
                        <Input type="password" name="password" required value={password} onChange={this.handleChange} />
                    </FormGroup>
                    <br />
                    <label name="alert" style={{ color : "#ff0000"}} >{alert}</label>
                    <br /><br />
                    <Button color="info" style={{ marginRight :"2%"}} onClick={this.handleSubmit}>Login</Button>
                    <Link to="/reg"><Button color="success">Register</Button></Link>
                </div>
                </div>
                <div className="col"></div>
            </div>
        )
            
        }
        
}

Users.propTypes = {
    history: PropTypes.object.isRequired 
}

export default Users