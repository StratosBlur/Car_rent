import React, {Component} from "react"
import fetch from 'isomorphic-fetch'
import {Button, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
    Input,
    Label,
    Form
} from 'reactstrap'
import qs from 'qs'
import axios from 'axios'
import {Link} from 'react-router-dom'
export default class Addcar extends Component {
    

    constructor(props){
        super(props)
        this.state = {
            Cars : [],
            isLoading:false,
            Car_name : "",
            Seats : "",
            Doors : "",
            Gear : "",
            pic_one : "",
            pic_two : "",
            pic_three : "",
        
        }
        this.load_car = this.load_car.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.toggle = this.toggle.bind(this)
        this.add_car = this.add_car.bind(this)
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

    load_car(){
        fetch('http://127.0.0.1:1222/api/Cars/')
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

    add_car(){
        var url = "http://localhost:1222/api/cars/add"
        axios.post(url,qs.stringify({
            Car_name : this.state.Car_name,
            Seats : this.state.Seats,
            Doors : this.state.Doors,
            Cost : this.state.Cost,
            Gear : this.state.Gear,
            pic_one   : this.state.pic_one,
            pic_two   : this.state.pic_two,
            pic_three : this.state.pic_three
        }))

        this.toggle()
    }

    componentDidMount(){
        this.load_car()

    }
    render(){

        const { Cars } = this.state
        return (
            <div>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} backdrop="static" keyboard="false">
                <ModalHeader toggle={this.toggle}>เพิ่มรถยนต์</ModalHeader>
                <ModalBody>
                    <Form className="form-inline">
                    <Label>ชื่อรุ่น</Label>
                    <Input type="text" name="Car_name" value={this.state.Car_name}  onChange={this.handleChange}/>
                    </Form>
                    <Form className="form-inline">
                    <Label>ที่นั่ง</Label>
                    <Input type="text" name="Seats" value={this.state.Seats}  onChange={this.handleChange}/>
                    </Form>
                    <Form className="form-inline">
                    <Label>ประตู</Label>
                    <Input type="text" name="Doors" value={this.state.Doors}  onChange={this.handleChange}/>
                    </Form>
                    <Form className="form-inline">
                    <Label>เกียร์</Label>
                    <Input type="text" name="Gear" value={this.state.Gear}  onChange={this.handleChange}/>
                    </Form>
                    <Form className="form-inline">
                    <Label>ราคา</Label>
                    <Input type="text" name="Cost" value={this.state.Cost}  onChange={this.handleChange}/>
                    </Form>
                    <Form className="form-inline">
                    <Label>รูปภาพ URL 1</Label>
                    <Input type="text" name="pic_one" value={this.state.pic_one}  onChange={this.handleChange}/>
                    </Form>
                    <Form className="form-inline">
                    <Label>รูปภาพ URL 2</Label>
                    <Input type="text" name="pic_two" value={this.state.pic_two}  onChange={this.handleChange}/>
                    </Form>
                    <Form className="form-inline">
                    <Label>รูปภาพ URL 3</Label>
                    <Input type="text" name="pic_three" value={this.state.pic_three}  onChange={this.handleChange}/>
                    </Form> 
                    <Button onClick={this.add_car}>เพิ่มรถยนต์</Button>                  
                </ModalBody>
                <ModalFooter>
                </ModalFooter>
             </Modal>

                <h1>การจัดการรถยนต์</h1>
               <Button color="info" onClick={this.toggle}>เพิ่มรถ</Button>
                <table className="table">
                    <thead>
                        <tr>
                            <th>รหัสรถ</th>
                            <th>รุ่น</th>
                            <th>spec</th>
                            <th>สถานะ</th>
                            <th>รูปภาพ</th>
                            <th>ราคา</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Cars.map(car => (
                            <tr key={car.Car_id}>
                                <th>{car.Car_id}</th>
                                <td>{car.Car_name}</td>
                                <td> จำนวนที่นั่ง {car.Seats} <br />  จำนวนประตู {car.Doors} <br/>เกียร์ {car.Gear} </td>
                                <td>{car.status}</td>
                                <td><img style={{height : 300 , width :500}} src={car.Img.pic_one} alt="..." /></td>
                                <td>{car.Cost}</td>
                                <td><Button color="suscess">ปรับสถานะ</Button>
                                    <Link to={"/delete_car/" + car.Car_id}>
                                        <Button color="danger">ลบ</Button>
                                    </Link>
                                   <Link to={"/edit_car/"+ car.Car_id }><Button color="warining" >แก้ไข</Button></Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            
            
            </div>
        )
    }

}