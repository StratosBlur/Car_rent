import React,{ Component } from "react";
import {Button, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
    Form,
    Input,
    Label
} from 'reactstrap'
import Cookies from 'universal-cookie'
import fetch from 'isomorphic-fetch'
import PropTypes from 'prop-types'  
import axios from 'axios'
import qs from 'qs'
import {Link} from 'react-router-dom'
var Cookie = new Cookies()

class emp_login extends Component {
    constructor(props){
        super(props)
        this.state = {
            modal: true,
            email: "",
            password : "",
            alert : "",
            bookinglist : [],
        };

        this.toggle = this.toggle.bind(this)
        this.login = this.login.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.load_bookinglist = this.load_bookinglist.bind(this)
        this.cancel = this.cancel.bind(this)
    }

    cancel(txt){
        
        var email = txt
        axios.post('http://127.0.0.1:1222/api/book/return',qs.stringify({
            "email" : String(email),
        }));
        window.location.reload()
    }

    login(event){
        const { email , password } = this.state
        var url = "http://127.0.0.1:1222/api/emp/login/"+email+"/"+password
        fetch(url)
            .then(Response => Response.json())
            .then((data) =>{
                if(data.length >= 1){
                    Cookie.set('staff' , email)
                    window.location.reload()
               }else {
                   this.setState({
                       alert : "ข้อมูลไม่ถูกต้อง !"
                   }) 
               }

            })
        event.preventDefault()  
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

    toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }

    load_bookinglist(){
        var url = "http://127.0.0.1:1222/api/Book"
        fetch(url)
            .then(Response => Response.json())
            .then((data) => {
                this.setState({
                    bookinglist : data
                })
            })
    }
    componentDidMount() {
        if (Cookie.get('staff') != null){
            this.toggle();
        }
        this.load_bookinglist()
    }
    
    render(){
        
        return (<div>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} backdrop="static" keyboard="false">
                <ModalHeader toggle={this.toggle}>Staff Login</ModalHeader>
                <ModalBody>
                    <Form className="form-inline">
                        <Label style={{marginRight  : "6%"}}>Email </Label>
                        <Input type="email" name="email" required onChange={this.handleChange}/>
                    </Form>                      
                    <Form className="form-inline">
                        <Label>Password  </Label>
                        <Input type="password" name="password" required onChange={this.handleChange} />
                    </Form>
                    <br />
                    <Label>{this.state.alert}</Label>
                    <br />
                    <Button onClick={this.login}>
                        Staff Login
                    </Button>
                </ModalBody>
                <ModalFooter>
                </ModalFooter>
             </Modal>
            <h1>Booking And Rent Management</h1>
            <div className="row">
                
                    <table className="table">
                    <thead>
                        <tr>
                            <th>Customer Email</th>
                            <th>ราคา</th>
                            <th>รหัสรถที่จะเช่า</th>
                            <th>สถานะการชำระเงิน</th>
                            <th>ความคืบหน้า</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.bookinglist.map(list => (
                            <tr key={list.email}>
                                <th>{list.email}</th>
                                <th>{list.Cost}</th>
                                <th>{list.Car_id}</th>
                                <th>{list.paid? "✔":"×"}</th>
                                <th>{list.stat}</th>
                                <th><Button color="Primary">ดำเนินการให้เช่า</Button><Link to={"/delete/" + list.email }>ไม่อนุมัติ</Link></th>
                            </tr>
                        ))}
                    </tbody>
                    </table>
                          
            </div>



        </div>)
    }
}

emp_login.propTypes = {
    history: PropTypes.object.isRequired 
}


export default emp_login