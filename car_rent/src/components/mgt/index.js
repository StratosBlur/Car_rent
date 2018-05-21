import  React ,{ Component } from "react";
import fetch from 'isomorphic-fetch'
import Addcar from "../employees/addcar";
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
import { Link } from 'react-router-dom'
var Cookie = new Cookies()
class mgt extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            emp : [],
            modal: true,
            email: "",
            password : "",
            alert : "",
        }
        this.toggle = this.toggle.bind(this)
        this.login = this.login.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.loademp = this.loademp.bind(this)
    }

    componentDidMount(){
        if (Cookie.get('staff') != null){
            this.toggle();
        }
        this.loademp()
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

    loademp(){
        fetch('http://127.0.0.1:1222/api/emp')
        .then(Response => Response.json())
        .then((data) => {
            this.setState({
                emp : data
            })
        })
    }
    
    render(){
        const { emp } = this.state
        return(
            <div>
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
            <h1>ส่วนการจัดการพนักงาน</h1>
            <div className="row">
                <Link to="/addstaff"><Button color="info">เพิ่มผู้ใช้งาน</Button></Link>
                <table className="table">
                    <thead>
                        <tr>
                            <th>รหัสพนักงาน</th>
                            <th>email</th>
                            <th>password</th>
                            <th>เลขประจำประชาชน</th>
                            <th>level</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {emp.map(e =>(
                        <tr key={e.sid}>
                            <th>{e.sid}</th>
                            <th>{e.email}</th>
                            <th>{e.password}</th>
                            <th>{e.idcard}</th>
                            <th>{e.level}</th>
                            <th><Link to={"/staff/"+e.email }><Button color="warning">แก้ไขข้อมูล หรือลบ</Button></Link></th>
                        </tr>
                    ))}
                    </tbody>
                </table>
                
            </div>
            <div className="row">
                 <Addcar />       
            </div>
            </div>)
    }
}

export default mgt