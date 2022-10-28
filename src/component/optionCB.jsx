import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


import React, {Component} from "react";
import { Route,Switch, Redirect } from "react-router-dom";


class OptionCB extends Component {
 state={
}

handleChange=(e)=>{
    let {currentTarget:input}=e
    let options ={...this.props.options}

    options[input.name]=input.value
    
    console.log("OptionsCB",options);
    
    this.props.onOptionChange(options)
    }



    render(){ 
        const{minPrice="",maxPrice=""}=this.props.options
    
return (
<div className='row '>
<div className='col-2 text-center'> :</div>
<div className='col-2 text-center'>Price Range :</div>
<div className='col-2'>

<div className='form-group'>
        <input type="text" className="form-control" id="minPrice" name="minPrice" value={minPrice} placeholder="Enter minPrice" onChange={this.handleChange} />
      
    </div>
    </div>
    <div className='col-2'>
    <div className='form-group'>
        <input type="text" className="form-control" id="maxPrice" name="maxPrice" value={maxPrice} placeholder="Enter maxPrice" onChange={this.handleChange} />
      
    </div>
    </div>

<div className='col-4'></div>
</div>
)
    }
}
export default OptionCB;