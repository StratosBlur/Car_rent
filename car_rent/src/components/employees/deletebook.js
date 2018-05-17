import React, {Component} from 'react'
import Proptypes from 'prop-types'
import axios from 'axios'
import qs from 'qs'


class deletebook extends Component{
    
    componentDidMount = () => {
        var email = this.props.match.params.email
        const url = "http://127.0.0.1:1222/api/book/return"
        axios.post(url,qs.stringify({
            "email" : String(email),
        }))
        window.location.href = 'http://localhost:3000/emp';
    }

    render(){
        return (<div>...</div>)
    }
    
    
}

deletebook.propTypes = {
    history: Proptypes.object.isRequired 
}

export default deletebook