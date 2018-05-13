import React,{Component} from 'react'
import fetch from 'isomorphic-fetch'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'
 

class Car extends Component {
    
    
    constructor(props){
        super(props)
        this.state = {
            Cars : [],
            
        }
        this.OnReload  = this.OnReload.bind(this)
       
        
        
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

    componentDidMount() {
        
        this.OnReload()
       //this.find()
    }

    
    render(){
        const { Cars } = this.state
        

            return (
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
            )
        }
        
    }


export default Car