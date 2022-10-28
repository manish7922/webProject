import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


import React, {Component} from "react";
import { Route,Switch, Redirect } from "react-router-dom";
import CarsItem from './carsItem';
import Navbar from './navbar';
import AddCar from './addCars';
import DeleteCar from './deleteCar';
class MainComponent extends Component {
 state={
}
    render(){ 
return (
<div className='container'>
<Navbar />
<Switch>
<Route path="/car/:id" component={AddCar} />
<Route path="/cars/:id/delete" component={DeleteCar} />
<Route path="/cars/:id" component={CarsItem} />
<Route path="/car" component={AddCar} />
<Route path="/cars" component={CarsItem} />
<Redirect form="/" to="/cars" />
</Switch>
</div>
)
    }
}
export default MainComponent;