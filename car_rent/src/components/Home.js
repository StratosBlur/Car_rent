import React, { Component } from 'react'


const intputParsers = {
    Car_name(input){
        return input
    },
    Car_doors(input){
        return parseInt(input,10)
    }
}

class Home extends Component {
    constructor(props){
        super(props)
        
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    handleSubmit(event){
        event.preventDefault()
        const form = event.target
        const data = new FormData(form)
        for (let name of data.keys()){
            const input = form.elements[name]
            const ParserName = input.dataset.parse
            if(ParserName){
                const parser = intputParsers[ParserName]
                const parsedValue = parser(data.get.name)
                data.set(name,parsedValue)
            }
            
            
        }
        fetch('/api/form-submit-url',{
            method: 'POST',
            body : data,
        })

    }
    
    
    render(){
        return (
            <div>
                <div className="row">
                    
                    <div className="col">
                        <div>
                            <h1>ค้นหารถเช่าที่คุณต้องการ</h1>
                            <form onSubmit={this.handleSubmit}>
                                <div className="carousel">
                                <label style={{'padding-right':'2%'}}>ยี่ห้อรถ</label>
                                <select name="Car_name" data-parse="Car_name">
                                    <option value="volvo">Volvo</option>
                                    <option value="saab">Saab</option>
                                    <option value="fiat">Fiat</option>
                                    <option value="audi">Audi</option>
                                </select>
                                <br/>
                                <label style={{'padding-right':'7%'}}>ที่นั่ง</label>
                                <select name="Car_doors" data-parse="Car_doors">
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