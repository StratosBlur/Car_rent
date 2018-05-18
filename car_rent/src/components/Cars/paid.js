import React , { Component } from "react"
import {Input,Label, Button} from 'reactstrap'
import {Link} from 'react-router-dom'

class paid extends Component {
    render(){
        return (<div>
            <h1>การแจ้งการชำระค่ามัดจำ</h1>
            <Link to="/book"><Button color="warning" style={{marginTop : "3%" , marginBottom : "3%"}}>กลับ</Button></Link><br/>
            <div className="jumbotron">
                <Label>ไฟล์รูปภาพสลิป</Label><br/>
                <Input type="file" /> <br/><br/>
                <Button color="info">อัพโหลดสลิปการชำระเงิน</Button>
            </div>
            </div>)
    }
}

export default paid

