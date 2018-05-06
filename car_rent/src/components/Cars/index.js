import React,{Component} from 'react'
import fetch from 'isomorphic-fetch'


class Cars extends Component {
    constructor(props){
        super(props)
        this.state = {
            Cars : [],
            isLoading:false,
            error:null,
            activeIndex: 0,
            pics: []
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
        const { Cars, isLoading , error  } = this.state
        if(error){
            return <p> Error : {error.message} </p>
        }else if(!isLoading){
            return <p> loading... </p>
        }else {
             
            return (
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>รหัสรถ</th>
                                <th>รุ่น</th>
                                <th>Spec</th>
                                <th>รูปภาพ</th>
                            </tr>
                        </thead>
                        <tbody>
                           {Cars.map(car => (
                               <tr key={car.Car_id}>
                                <th>{car.Car_id}</th>
                                <td>{car.Car_name}</td>
                                <td> จำนวนที่นั่ง {car.Car_spec.Seats} จำนวนประตู {car.Car_spec.Doors} ประเภทเกียร์ {car.Car_spec.Gear}</td>
                                 <td>
                                    <img src={car.Img.pic_one} alt="..."/>
                                </td>
                                </tr>
                           ))}
                        </tbody>
                    </table>                    
                </div>
            )
        }
        
    }
}

export default Cars 