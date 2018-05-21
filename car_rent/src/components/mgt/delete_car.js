import React, {Component} from 'react'
import Proptypes from 'prop-types'
import axios from 'axios'
import qs from 'qs'


class delete_car extends Component{
    
    componentDidMount = () => {
        var Car_id = this.props.match.params.Car_id
        const url = "http://127.0.0.1:1222/api/cars/delete"
        axios.post(url,qs.stringify({
            "Car_id" : String(Car_id),
        }))
        window.location.href = 'http://localhost:3000/admin';
    }

    render(){
        return (<div></div>)
    }
    
    
}

delete_car.propTypes = {
    history: Proptypes.object.isRequired 
}

export default delete_car