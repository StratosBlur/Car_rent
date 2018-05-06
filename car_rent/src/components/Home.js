import React, { Component } from 'react'
import Cars from './Cars'



class Home extends Component {
    
    
    render(){
        return (
            <div>
                <div className="row">
                    
                    <div className="col">
                        
                    </div>
                    <div className="col">
                    
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col">
                    <Cars />
                    </div>
                </div>
            </div>
        )
    }
}

export default Home