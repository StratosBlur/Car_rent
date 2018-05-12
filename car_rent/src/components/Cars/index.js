import React,{Component} from 'react'
import fetch from 'isomorphic-fetch'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button, FormGroup, Label, Input} from 'reactstrap'


class Cars extends Component {
    
    
    constructor(props){
        super(props)
        this.state = {
            Cars : [],
            isLoading:false,
            error:null,
            activeIndex: 0,
            pics: [],
            Car_name : "",
            Seats : 2,
            Cost : 2000

        }
        this.OnReload  = this.OnReload.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.find = this.find.bind(this)
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

    find(event){
        const { Cost , Seats} = this.state
        var url = "http://127.0.0.1:1222/api/cars/find/"+Seats+"/"+Cost
        fetch(url)
            .then(Response => Response.json())
            .then((data) =>{
                this.setState({
                    Cars:data,
                    isLoading:true
                })
            })
            .catch(err => console.error(err))
        
        event.preventDefault()
    }

    OnReload(){
        this.setState({isLoading : true})
        fetch('http://127.0.0.1:1222/api/Cars/')
        .then(Response => Response.json())
        .then((data) => {
            this.setState({
                Cars:data,
                isLoading:true
            })
            },
            (error) => {
                this.setState({
                    isLoading: true,
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
        const { Cars, isLoading , error ,  Seats ,Cost } = this.state
        if(error){
            return <p> Error : {error.message} </p>
        }else if(!isLoading){
            return <p> Loading... </p>
        }else {
             
            return (
                <div>
                <div className="row">
                    <div className="col">
                        <Button color="info" onClick={ () => this.OnReload()}>
                            <span className="glyphicon glyphicon-refresh"></span>
                            โหลดใหม่
                        </Button>
                    </div>
                    <div className="col">
                        <Label for="search1">ค้นหา</Label>
                         <FormGroup>
                            <Label for="search2">ที่นั่ง</Label>
                            <Input type="select" name="Seats" ClassId="search2" value={Seats} onChange={this.handleChange}>
                                <option>2</option>
                                <option>4</option>
                                <option>6</option>
                                <option>8</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="search3">ราคา</Label>
                            <Input type="string" name="Cost" value={Cost} onChange={this.handleChange} />
                        </FormGroup>
                    <Button onClick={this.find} >ค้นหา</Button>
            </div>
                    </div> 
                   
                <br/>
               
                <div className="row">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>รหัสรถ</th>
                                <th>รุ่น</th>
                                <th>Spec</th>
                                <th>รูปภาพ</th>
                            </tr>
                        </thead>
                        <tbody>
                           {Cars.map(car => (
                               <tr key={car.Car_id}>
                                <th>{car.Car_id}</th>
                                <td>{car.Car_name}</td>
                                <td> จำนวนที่นั่ง {car.Seats} จำนวนประตู {car.Doors} ประเภทเกียร์ {car.Gear}</td>
                                 <td>
                                    <img src={car.Img.pic_one} alt="..."/>
                                </td>
                                </tr>
                           ))}
                        </tbody>
                    </table>                    
                </div>
                </div>
            )
        }
        
    }
}

export default Cars 