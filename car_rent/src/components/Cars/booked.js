import React , {Component}from 'react'
import PropTypes from 'prop-types'
import Cookies from 'universal-cookie'
import axios from 'axios'
import qs from 'qs'

var Cookie = new Cookies()

function getDate (date){
    var yyyy = date.substring(0,4)
    var mm =date.substring(5,7)
    var dd = date.substring(8,11)
    return dd+mm+yyyy
}

function addDate(date,day){
    var result = new Date(date)
    var d2 = result.getDate() + 1
    result.setDate(d2);
    var dd = result.getDate()
    var mm = result.getMonth()+1
    var yyyy = result.getFullYear()
    String(yyyy).replace("/","")
    return dd+""+mm+"/"+yyyy
}



class booked extends Component {

    constructor(props){
        super(props)
        this.booking = this.booking.bind(this)
    }

    booking(){
        
        const Car_id = this.props.match.params.Car_id
        const email = Cookie.get('email')
        const cost = this.props.match.params.cost
        const day = this.props.match.params.day
        var Rentstart = this.props.match.params.startdate
        var enddate = addDate(Rentstart,day)
        // ทำวันที่สินสุดการเช่า
        axios.post('http://127.0.0.1:1222/api/book/booking',qs.stringify({
            "email" : String(email),
            "Car_id" : String(Car_id),
            "Cost" : String(cost),
            "startdate" : getDate(Rentstart),
            "enddate" : enddate
        }));
        
    }

    componentDidMount() {
        this.booking()
        window.location.href = "http://localhost:3000/book"
    }
    

    render(){
        return <div></div>
    }
}

booked.propType = {
    history : PropTypes.object.isRequired
}

export default booked