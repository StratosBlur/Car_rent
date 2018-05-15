import React,{Component} from 'react'
import fetch from 'isomorphic-fetch'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button,Input, FormGroup } from 'reactstrap'
import { Link  } from 'react-router-dom'
import Cookies from 'universal-cookie'
import axios from 'axios'
import qs from 'qs'
var Cookie = new Cookies();

class Car extends Component {
    
    
    constructor(props){
        super(props)
        this.state = {
            Cars : [],
            day : 0,
            cost : 0,
            Car_id : ""
           
            
        }
        this.OnReload  = this.OnReload.bind(this)
        this.handleChange =  this.handleChange.bind(this)
        this.booking = this.booking.bind(this)
    }

    handleChange(event){
        event.preventDefault()
        const target = event.target
        const value = target.value
        const name = target.name

        if(name === "day"){
            if(value > 15 || value < 1){
                alert("จำนวนวันไม่ถูกต้อง")
            }
        }

        this.setState({
            [name] : value
        })


    }

    booking(){
        const Car_id = this.props.match.params.Car_id
        const email = Cookie.get('email')
        const cost = this.state.cost
   
        axios.post('http://127.0.0.1:1222/api/book/booking',qs.stringify({
            "email" : String(email),
            "Car_id" : String(Car_id),
            "Cost" : String(cost*(50/100))
        }));
        


    }

    OnReload(){
        fetch('http://127.0.0.1:1222/api/Cars/findbyId/'+this.props.match.params.Car_id)
        .then(Response => Response.json())
        .then((data) => {
            this.setState({
                Cars:data,
               
            })
            },
            (error) => {
                this.setState({
                    error
                })
            
            }
        )
    }
    
    componentWillMount() {
        this.OnReload()
    }
    
    componentDidMount() {
        this.OnReload()
       //this.find()
    }

    
    render(){
        const { Cars   } = this.state
        
            return (
                <div>
                <div className="row">
                <Link to="/"><Button color="warning">กลับ</Button></Link>
                <div  className="col">
                    {Cars.map(car => (
                        <div key={car.Car_id} className="jumbotron">
                        <h1 style={{marginTop : "-12%"}} >{car.Car_name }</h1>
                        รหัสรถ {car.Car_id}<br />
                        จำนวนที่นั่ง : {car.Seats}<br />
                        ประเภท Gear : {car.Gear}<br />
                        ราคา : {car.Cost} ฿/Day<br />
                        <FormGroup className="form-inline">
                            <label>จำนวนวันที่เช่า   </label>
                            <Input type="number" name="day" value={this.state.day} onChange={this.handleChange}/>
                            <label> ราคาโดยประมาณ {this.state.day * car.Cost } ฿</label>
                        </FormGroup>
                        
                        <br />
                        <br />
                        <br />
                        <Link to="/" className="btn btn-success" onClick={this.booking} style={{marginBottom : "-10%" , height : "60px" , width : "50%" , textAlign : "center" , fontSize : "35px"}}>จองเลย!</Link>
                        </div>
                    ))}
                </div>
                <div className="col" style={{marginLeft : "5%"}}>
                {Cars.map(car => (
                
                    <div key={car.Car_id}>
                        <img src={car.Img.pic_one} alt="..." />
                        <img src={car.Img.pic_two} alt="..." />
                        <img src={car.Img.pic_three} alt="..." />
                    </div>
                ))}  
                </div>
                
                </div>
                
                </div>
            )
        }
        
    }


export default Car