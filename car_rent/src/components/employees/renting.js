import React , { Component } from 'react'
import axios from 'axios'
import qs from 'qs'


class renting extends Component {

    

    componentDidMount = () => {
        var email = this.props.match.params.email
        var url = "http://127.0.0.1:1222/api/book/renting"
        axios.post(url,qs.stringify({
            "email" : String(email)
        }))
        window.location.href = "http://127.0.0.1:3000/emp"

    }

    render(){
        return(<div></div>)
    }
    
}

export default renting