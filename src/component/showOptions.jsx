import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


import React, {Component} from "react";
import { Route,Switch, Redirect } from "react-router-dom";


class ShowOptions extends Component {
 state={
}

handleChange=(e)=>{
    let {currentTarget:input}=e
    let options ={...this.props.options}

    options[input.name]=input.value
    
    console.log("OptionsCB",options);
    
    this.props.onOptionChange(options)
    }

showRadios=(arr,values,name,label)=>(

    <React.Fragment>
       <label className="form-check-label font-weight-bold ">{label}</label>
           {arr.map((opt)=>(
    <div className='form-check  border m-2'>
<input  className="form-check-input" type="radio" name={name} value={opt} checked={values===opt} onChange={this.handleChange} />   
<label className="form-check-label">{opt}</label>
</div>
))} 
    </React.Fragment>
)

    render(){ 
        const{fuel="",type="",sort=""}=this.props.options
        const {fuels,types,sorting}=this.props
return (
<div className='row '>
<div className="col-12 m-1 border">
        { this.showRadios(fuels,fuel,"fuel","Fuel")}
        </div>
        <div className="col-12 m-1 border">
        { this.showRadios(types,type,"type","Type")}
        </div>
        <div className="col-12 m-1 border">
        { this.showRadios(sorting,sort,"sort","Sort")}
        </div>
</div>
)
    }
}
export default ShowOptions;