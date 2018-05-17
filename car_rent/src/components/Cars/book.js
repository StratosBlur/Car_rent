import React , { Component } from 'react'
import Cookies from 'universal-cookie'
import fetch from 'isomorphic-fetch'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Input , Button ,Label } from "reactstrap"
import axios from 'axios'
import qs from 'qs'
import {Link } from 'react-router-dom'
import PropTypes from 'prop-types'

var Cookie = new Cookies()



class Book extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            booklist : [],
            hide : false
        }
        this.cancelBtn = this.cancelBtn.bind(this)
        this.date_best = this.date_best.bind(this)
    }
    
    date_best(original) {
        
        var ans = ""
        if(original == null){
            return "-"
        }else{
            for(var i = 0;i<original.length ; i++){
                if(i===1){
                    ans+= original[i]+"/"
                }else if (i===3){
                    ans+= original[i]+"/"
                }else{
                    ans+= original[i]
                }
            }
            return ans
        }
        
    }

    cancelBtn(event){
        event.preventDefault()
        var email = Cookie.get('email')
        axios.post('http://127.0.0.1:1222/api/book/return',qs.stringify({
            "email" : String(email),
        }));
        this.props.history.push('/')
    }

    componentDidMount = () => {
       var email = Cookie.get('email')
       var url = 'http://127.0.0.1:1222/api/book/getbook/'+email
      fetch(url)
      .then(Response => Response.json())
      .then((data) => {
          this.setState({booklist : data})
          if(data[0].Car.Car_id !== ""){
              this.setState({
                  hide : true
              })
          }
      })
      .catch(err => console.error(err))
      

    }
    
    
    render(){
        const { booklist }  = this.state
        return ( 
            <div>
                <div className="row">
                    <div className="col">
                        <div className="jumbotron">
                            <h1 style={{marginTop : "-10%"}}>รถของคุณ</h1>
                            {booklist.map(list => (
                                <div key={list.email} >
                                    <div className="form-inline">
                                        <Label style={{margin : "2%"}}>รหัสรถ: </Label>
                                        <Input type="text" value={list.Car.Car_id} disabled/>
                                    </div>
                                    <div className="form-inline">
                                        <Label style={{margin : "2%"}}>วันที่จอง: </Label>
                                        <Input type="text" value={this.date_best(list.Car.Book_createDate)} disabled/>
                                    </div>
                                    <div className="form-inline">
                                        <Label style={{margin : "2%"}}>เหลืออีก</Label>
                                        <Input type="text" value={list.Car.Book_remainingDay} disabled style={{width : "7%"}}/>
                                        <Label>ครบกำหนดชำระค่าเช่า</Label>
                                    </div>
                                    <div className="form-inline">
                                        <Label style={{margin : "2%"}}>ยอดที่ต้องชำระทั้งสิ้น: </Label>
                                        <Input type="text" value={list.Car.Book_Cost} disabled /> ฿
                                    </div>
                                    <div className="form-inline">
                                        <Label style={{margin : "2%"}}>วันที่เริ่มขับ: </Label>
                                        <Input type="text" value={this.date_best(list.Car.Rent_Start_Date)} disabled/>
                                    </div>
                                    <div className="form-inline">
                                        <Label style={{margin : "2%"}}>วันที่ต้องคืน: </Label>
                                        <Input type="text" value={this.date_best(list.Car.Rent_Return_Date)} disabled/>
                                    </div>
                                </div>
                            ))}
                            <br/>
                            <div className="form-inline">
                                
                                   { this.state.hide && <Button color="info">แจ้งการชำระเงิน</Button>}
                                   { this.state.hide && <Link to="/"><Button color="danger" style={{marginLeft : "30%"}} onClick={this.cancelBtn}>ยกเลิกการจอง</Button></Link>}
                                
                            </div>
                        </div>
                    </div>
                    <div className="col"></div>
                </div>
                            
            </div>
        )
    }
}


Book.propTypes = {
    history: PropTypes.object.isRequired 
}


export default Book