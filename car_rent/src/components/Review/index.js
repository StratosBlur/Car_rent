import  React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter , Input } from 'reactstrap';
import Cookies from 'universal-cookie'

var Cookie = new Cookies()
class Review extends Component {
    constructor(props){
        super(props)

        this.state = {
            
            Comment : "",
            data : [],
            modal: false
        }

        this.toggle = this.toggle.bind(this);
        this.handleChange = this.handleChange.bind(this)
        this.submit_form = this.submit_form.bind(this)
        this.load = this.load.bind(this)
    }

    toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }

      
    handleChange(event){
        event.preventDefault()
        const target = event.target
        const value = target.value
        const name = target.name
        this.setState({
            [name] : value
        })
    }

    submit_form(event){
        event.preventDefault()
        var Name = Cookie.get('email')
        var Comment = this.state.Comment
        var url = "http://localhost:1222/api/Reviews/comment/"+Name+"/"+Comment
        fetch(url)
       .then(reponse => {
           window.location.reload()
       })
        
    }

    load(){
        var url= "http://localhost:1222/api/Reviews/"
        fetch(url)
        .then(respose => respose.json())
        .then((respose) => {
            this.setState({
                data :respose
            })
        })
    }

    componentDidMount() {
        this.load()
    }
    


    render(){
        const {data} = this.state
        return (<div>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>CommentBox</ModalHeader>
          <ModalBody>
            <Input type="text" name="Comment" onChange={this.handleChange}/>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.submit_form}>Submit</Button>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <Button onClick={this.toggle}>แสดงความคิดเห็น</Button>
        <div className="row">
            <div className="col">
            </div>
            <div className="col">
            {data.map(c => (
                <div key={c.Name} className="jumbotron">
                    
                    <h3 style={{marginTop :  "-18%"}}>Account : {c.Name}</h3>
                    
                    <p>ความคิดเห็น: {c.Comment}</p>
                </div>
            ))}
             

            </div>
            <div className="col">
            </div>
        </div>
        
            
            
            </div>)
    }


}

export default Review