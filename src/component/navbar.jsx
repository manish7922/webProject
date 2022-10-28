import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


import React, {Component} from "react";
import {Link} from "react-router-dom"
class Navbar extends Component {


    render(){
 
  
return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
    <Link className="navbar-brand"  to="/"> </Link>
    <div className="row" id="navbarSupportedContent">
    <ul className="navbar-nav">

    <li className="nav-item">
        <a className="nav-link text-white" href="/cars">
          Home
        </a>
    </li>
 
    <li className="nav-item  navbar-center">
        <a className="nav-link  text-white" href="/car">
          New Car
        </a>
        
    </li>

    </ul>
    </div>
        </nav>
)
    }
}
export default Navbar;