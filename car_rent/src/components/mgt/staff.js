import React , {Component} from 'react'
import fetch from 'isomorphic-fetch'
import {Input , Button , Label  } from 'reactstrap'
import {Link} from 'react-router-dom'
class staff extends Component {
   
    constructor(props){
        super(props)
        this.state = {
            emp : [],
            email: "",
            pasword : "",
            idcard : ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.update =this.update.bind(this)
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

    update(){
        var url = "http://localhost:1222/api/emp/edit/"+this.state.email+"/"+this.state.password+"/"+this.state.idcard
        fetch(url)
        alert("อัพเดทสำเร็จ")
        //window.location.href =  "http://localhost:3000/admin"
    }

   componentDidMount(){
        var url = "http://127.0.0.1:1222/api/emp/find/"+this.props.match.params.email
        fetch(url)
        .then(Response => Response.json())
        .then((data) => (
            this.setState({
                emp : data,
                email : data[0].email,
                password : data[0].password,
                idcard : data[0].idcard
            })
        ))
   }
   
    render(){
        const { emp } = this.state
        return (<div>
            <Link to="/admin"><Button>กลับ</Button></Link><br /><br /><br />
            <div className="jumbotron">
            { emp.map( e => (
                
                <div key={e.sid}>
                    <div className="form-inline">
                        <Label style={{marginRight : "3%"}}>email :</Label>
                        <Input type="text"  value={this.state.email} name="email" onChange={this.handleChange}/>
                    </div>
                    <div className="form-inline">
                        <Label style={{marginRight : "0.5%"}}>password :</Label>
                        <Input type="text" name="password" value={this.state.password}  onChange={this.handleChange}/>
                    </div>
                    <div className="form-inline">
                        <Label style={{marginRight : "3%"}}>เลขประจำตัวประชาชน :</Label>
                        <Input type="text" name="idcard" value={this.state.idcard}  onChange={this.handleChange}/>
                    </div>
                    <div className="form-inline">
                        <Label style={{marginRight : "3%"}}>ระดับพนักงาน :</Label>
                        <Input value={e.level} disabled/>
                    </div>
                    <Link to={"/delete/" + e.email}><Button color="danger">ลบผู้ใช้งานนี้</Button></Link>
                    <Button onClick={this.update} color="warning" style={{marginLeft : "10%"}}>อัพเดทข้อมูล</Button>
                </div>
            ))
            }
            </div>
            </div>)
    }


}

export default staff