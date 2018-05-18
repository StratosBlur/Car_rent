import React, { Component } from 'react'
import {Button , Input ,FormGroup } from 'reactstrap'
import PropTypes from 'prop-types'
import fetch from 'isomorphic-fetch'


class addStaff extends Component {
    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {
            email : "",
            password : "",
            idcard : "",
            alert : "",
            
        }
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
        event.preventDefault()
        
        if(!this.state.email.includes("@")){
            this.setState({
                alert : "ข้อมูลที่ไม่ถูกต้อง"
            })
        }
        else{
        
        var url = "http://localhost:1222/api/emp/register/"+ this.state.email +"/"+ this.state.password +"/"+ this.state.idcard
        fetch(url)
            .then(Response => Response.text())
            .then(data => {
                var str = data.localeCompare("no")
                
                if(str === 0){
                    this.setState({
                        alert : "ข้อมูลที่ไม่ถูกต้อง"
                    })
                }else{
                    alert("การลงทะเบียนเสร็จสิ้น")
                    this.props.history.push('/admin')
                }
            })
                
        } 
        
    }
     



    
    render(){
        const { password , email  , idcard ,alert} = this.state
        return (
            <div>
            <div className="row">
                <div className="col">
                    <h1>Add Staff</h1>
                    <br />
                    <div className="jumbotron">
                    <label name="alert" style={{ color : "#ff0000"}} >{alert}</label>
                        <FormGroup className="form-inline">
                            <label style={{padding : "2%"}}>Email</label>
                            <Input type="email" name="email" value={email}  onChange={this.handleChange} required/>
                        </FormGroup>
                        <FormGroup className="form-inline">
                            <label style={{padding : "0.6%"}}>Password</label>
                            <Input type="password" value={password} name="password" onChange={this.handleChange} required/>
                        </FormGroup>
                        <FormGroup className="form-inline">
                            <label style={{padding : "1.6%"}}>IDcard</label>
                            <Input type="text" value={idcard} name="idcard" onChange={this.handleChange} required/>
                        </FormGroup>
                        
                        <Button outline color="primary" style={{marginLeft : "7%"}} onClick={this.handleSubmit}>Confrim</Button>
                    </div>
                </div>
               
            </div>
            </div>
            
        )
    }
}

addStaff.propTypes = {
    history: PropTypes.object.isRequired 
}

export default addStaff