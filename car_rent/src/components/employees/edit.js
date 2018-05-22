import React ,{ Component } from "react";
import fetch from "isomorphic-fetch"
import {Input , Label , Button} from 'reactstrap'

export default class edit  extends Component {
    constructor(props){
        super(props)
        this.state = {
            Cost : ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.submitdata = this.submitdata.bind(this)
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
    
    submitdata(){
        var url = "http://localhost:1222/api/cars/edit/"+this.props.match.params.Car_id+"/"+this.state.Cost
        fetch(url)
        .then(response => (
            window.location.href = "http://localhost:3000/admin"
        ))
        
        
    }
    
    render(){
        return (<div>
                
            <h1>แก้ไขข้อมูลรถรหัส { this.props.match.Car_id}</h1>
            <Label>ราคา</Label>
            <Input type="text" name="Cost" onChange={this.handleChange}/>
            <Button onClick={this.submitdata}>submit</Button>
            
            
            </div>)
    }
}