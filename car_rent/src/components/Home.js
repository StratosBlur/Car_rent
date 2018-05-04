import React, { Component } from 'react'


class Home extends Component {
    constructor(props){
        super(props)
        this.state = {value : "saab"}
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(event){
        this.setState({value: event.target.value});
    }
    handleSubmit(event){
        
        event.preventDefault();
    }
    
    
    render(){
        return (
            <div>
                <div className="row">
                    
                    <div className="col">
                        <div>
                            <h1>ค้นหารถเช่าที่คุณต้องการ</h1>
                            <form method="post" onSubmit={this.handleSubmit}>
                                <div className="carousel">
                                <label style={{'padding-right':'2%'}}>ยี่ห้อรถ</label>
                                <select value={this.state.value} onChange={this.handleChange}>
                                    <option value="volvo">Volvo</option>
                                    <option value="saab">Saab</option>
                                    <option value="fiat">Fiat</option>
                                    <option value="audi">Audi</option>
                                </select>
                                <br/>
                                <label style={{'padding-right':'7%'}}>ที่นั่ง</label>
                                <select>
                                    <option value="2">2</option>
                                    <option value="4">4</option>
                                    <option value="6">6</option>
                                    <option value="8">8</option>
                                </select>
                                <br />
                                <input type="submit" value="ค้นหา"/>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col"></div>
                </div>
            </div>
        )
    }
}

export default Home