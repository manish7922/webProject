import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


import React, {Component} from "react";
import http from "./httpService"
import {Link} from "react-router-dom"

class DeleteCar extends Component {
 state={

 }



 async componentDidMount() {
    let {id}=this.props.match.params;
    let response= await http.deleteApi(`/cars/${id}`);
    // console.log("cars=",response
    this.props.history.push("/cars")
  
 }

    render(){

return ""
    }
}
export default DeleteCar;