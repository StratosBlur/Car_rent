import React ,{ Component } from "react";
import fetch from 'isomorphic-fetch'
import PropTypes from 'prop-types'
import {Input , Label} from 'reactstrap'

class rent extends Component {
    constructor(props){
        super(props)

        this.state= {
            paid : false
        }
        this.checkpaid = this.checkpaid.bind(this)

    }
    checkpaid(){
        var email = this.props.email
        var url = "http://127.0.0.1:1222/api/book/getbooklist/"+email
        fetch(url)
        .then(Response => Response.json())
        .then(data => {
            
            this.setState({
                paid : data[0].paid
            })
        })
    }
    
    componentDidMount(){
        this.checkpaid()
    }
    
    render(){
        if(this.state.paid === true ){
            return (<div>
                <br/>
                <br/>
                <br/>
                <div className="jumbotron">
                    <h1 style={{marginTop : "-10%"}}>การชำระค่าเช่า</h1>
                    <Label>อัพโหลดสลิปชำระค่าเช่า</Label>
                    <Input type="file"/>
                    <br />
                    <p style={{color : "red"}}>หมายเหตุ หากไม่อัพโหลดค่าเช่าภายหลังจากอนุมัติการจองภายใน 3 วัน ระบบจะทำการยกเลิกการจอง และขอสงวนสิทธิ์สำหรับเงินค่ามัดจำ</p>
                </div>
                
                </div>)
        }
        return (<div></div>)
        
    }
}

rent.propTypes = {
    email : PropTypes.string.isRequired
}


export default rent