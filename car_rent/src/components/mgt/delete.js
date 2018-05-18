import React , {Component} from 'react'
import fetch from 'isomorphic-fetch'
class delete_staff extends Component {
    
    componentDidMount = () => {
        var url = "http://localhost:1222/api/emp/remove/"+this.props.match.email
        fetch(url)

        window.location.href = "http://localhost:3000/admin"
    }
    
    
    
    
    render(){
        return (<div></div>)
    }
}

export default delete_staff