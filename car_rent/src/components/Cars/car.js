import React,{Component} from 'react'
import fetch from 'isomorphic-fetch'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button,Input, FormGroup } from 'reactstrap'
import { Link  } from 'react-router-dom'



class Car extends Component {
    
    
    constructor(props){
        super(props)
        this.state = {
            Cars : [],
            day : 1,
            cost : 0,
            Car_id : "",
            startdate : ""
            
        }
        this.OnReload  = this.OnReload.bind(this)
        this.handleChange =  this.handleChange.bind(this)
        
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
        const { Cars } = this.state
        
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
                            <Input type="number" name="day" value={this.state.day} onChange={this.handleChange} min="1" max="7"/>  
                        </FormGroup>
                        <FormGroup className="form-inline">
                            <label>วันที่เริ่มขับ</label>
                            <Input type="date" name="startdate"  onChange={this.handleChange}></Input>
                        </FormGroup>
                        <FormGroup className="form-inline">
                            <label> ราคาโดยประมาณ {  this.state.day * car.Cost } ฿</label>
                            <label> ค่ามัดจำ { (this.state.day * car.Cost )*0.5} </label>
                        </FormGroup>
                        
                        <br />
                        <br />
                        <br />
                        <Link to={"/booked/"+car.Car_id+"/"+this.state.day * car.Cost + "/" + this.state.startdate + "/" + this.state.day } className="btn btn-success" style={{marginBottom : "-10%" , height : "60px" , width : "50%" , textAlign : "center" , fontSize : "35px"}}>จองเลย!</Link>
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