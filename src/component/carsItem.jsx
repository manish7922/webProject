import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


import React, {Component} from "react";
import queryString from "query-string"
import {Link} from "react-router-dom"
import http from "./httpService"
import { FaTrash } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import ShowOptions from './showOptions';
import OptionCB from './optionCB';
class CarsItem extends Component {
 state={
    cars:[],
    fuels:["Diesel","Petrol"],
    types:["Sedan","Hatchback"],
    sorting:["Kms","price","year"]
}

async fetchData() {
    let querParams=queryString.parse(this.props.location.search)
    let searchStr=this.makeSearchString(querParams)
    let response= await http.get(`/cars?${searchStr}`)
    // console.log(response)
    let {data}=response;

    this.setState({cars:data})
 }

 componentDidMount() {
this.fetchData();
} 
componentDidUpdate(prevProps,prevState) {
if(prevProps!==this.props) this.fetchData();
}

handleOptionChange=(options)=>{
    this.callURL("/cars",options)  
}

callURL=(url,options)=>{
    let searchString=this.makeSearchString(options);
    this.props.history.push({
        pathName:url,
        search:searchString,
    })
}

makeSearchString=(options)=>{
    let {fuel,type,sort,minPrice,maxPrice}=options;
    let searchStr="";

    searchStr=this.addToQueryString(searchStr,"fuel",fuel)
    searchStr=this.addToQueryString(searchStr,"type",type)
    searchStr=this.addToQueryString(searchStr,"sort",sort)
    searchStr=this.addToQueryString(searchStr,"minPrice",minPrice)
    searchStr=this.addToQueryString(searchStr,"maxPrice",maxPrice)
    return searchStr;
}

addToQueryString=(str,parmaNaame,paramValue)=>
paramValue ? str ? `${str}&${parmaNaame}=${paramValue}` : `${parmaNaame}=${paramValue}`:str;


    render(){ 
        const { cars}=this.state
        const {fuels,types,sorting}=this.state
        let queryParams=queryString.parse(this.props.location.search)
        console.log(queryParams);
return (
<div className='container'>
<div className='row'>
    <div className='col-3'>
    <ShowOptions options={queryParams} fuels={fuels} types={types}  sorting={sorting}  onOptionChange={this.handleOptionChange}/>
    </div>
    <div className='col-9 '>
    <h3 className='text-center'>All Car</h3>
   <div className='row  '><OptionCB options={queryParams}  onOptionChange={this.handleOptionChange}/> </div> 
        <div className='row mt-2 ml-4'>
            {cars.map((n)=>(
                <>
                <div className='col-3 border bg-warning' key={n.id}>
                <h4>{n.model}</h4>
                Price : {n.price}<br />
                Color: {n.color}<br />
                Milleage: {n.kms}<br />
                Manufactured in {n.year}
                <div className="row">
                <>
                <div className="col-2"><Link to={`/car/${n.id}`}><FaEdit /></Link></div>
                <div className="col-8"></div>
                <div className="col-2"><Link to={`/cars/${n.id}/delete`}><FaTrash /></Link></div>
                </>
                </div>
                </div>
                </>
            ))}
        </div>
        
    </div>
    
</div>
</div>
)
    }
}
export default CarsItem;