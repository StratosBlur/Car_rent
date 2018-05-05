import React,{Component} from 'react'
import fetch from 'isomorphic-fetch'

class Cars extends Component {
    constructor(props){
        super(props)
        this.state = {
            Cars : [],
            isLoading:false,
            error:null
        }
    }
    componentDidMount() {
        this.setState({isLoading : true})

        fetch('http://127.0.0.1:1222/api/Cars/')
        .then(Response => Response.json())
        .then((data) => {
            this.setState({
                Cars:data,
                isLoading:true
            })
        },
        (error) => {
            this.setState({
                isLoading: true,
                error

            })
            console.log(error.message)
        }
    )
       
         
    }

    
    render(){
        const { Cars, isLoading , error } = this.state
        if(error){
            return <p> Error : {error.message} </p>
        }else if(!isLoading){
            return <p> loading </p>
        }else {
            return (
                <div>
                    <ul>
                        {Cars.map(car => (
                            <li key={car.Car_name}>
                                {car.Car_id} {car.Car_name} {car.Car_spec.Seats} {car.Car_spec.Doors}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
        
    }
}

export default Cars 