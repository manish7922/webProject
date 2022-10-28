

import React, {Component} from "react";

import http from "./httpService"

class AddCar extends Component {
 state={
    car:{ id:"", price:"",kms:"",year:"" ,model:"",color:""},
models:["Swift Dzire VXi","Etios SMi","City AXi","Swift DXi","Etios VXi","City ZXi"],
 carMaster : [
    {model: "Swift Dzire VXi", make: "Maruti", fuel: "Diesel", 
     colors: ["White", "Silver Grey", "Metallic Blue", "Red"], type: "Sedan", transmission: "Manual"},
    {model: "Etios SMi", make: "Toyota", fuel: "Diesel",
     colors: ["White", "Steel Grey", "Black"], type: "Hatchback", transmission: "Manual"},
    {model: "City AXi", make: "Honda", fuel: "Petrol",
     colors: ["Silver Grey", "Metallic Blue", "Black"], type: "Sedan", transmission: "Automatic"},
    {model: "Swift DXi", make: "Maruti", fuel: "Diesel",
     colors: ["White", "Red", "Black"], type: "Hatchback", transmission: "Manual"},
    {model: "Etios VXi", make: "Toyota", fuel: "Diesel",
     colors: ["White", "Silver Grey", "Black"], type: "Sedan", transmission: "Manual"},
    {model: "City ZXi", make: "Honda", fuel: "Petrol",
     colors: ["Silver Grey", "Metallic Blue", "Red"], type: "Sedan", transmission: "Manual"}
   ],
edit:false
}
componentDidMount() {
    this.fetchData()
     }
     componentDidUpdate(prevProps,prevState) {
        if(prevProps!==this.props) this.fetchData();
        }
     async fetchData(){
        const {id}=this.props.match.params;
        console.log(id);
        if(id){
        let response= await http.get(`/cars/${id}`);
        // console.log("person=",response)
        let {data}=response;
        console.log(data);
        this.setState({car:data,edit:true});
        }
        else{
          let car={ id:"", price:"",kms:"",year:"" ,model:"",color:""};
          this.setState({car:car,edit:false})
        }
    }
     handleChange=(e)=>{
        const {currentTarget:input}=e
        console.log(e);
        let s1={...this.state};
        s1.car[input.name] = input.value;
        this.setState(s1)
        }
        async postData(url,obj){
            let response=await http.post(url,obj);
            console.log(response);
            this.props.history.push("/cars")
        }
        async putData(url,obj){
            let response=await http.put(url,obj);
            console.log(response);
            this.props.history.push("/cars")
        }
        handleSumbit=(e)=>{
            e.preventDefault();
            let {car,edit}=this.state
            edit ? this.putData(`/cars/${car.id}`,car):this.postData("/cars",car)
            
            }

    render(){ 
        const {id,price,kms,year,model,color}=this.state.car
const  {models,carMaster}=this.state
const cities=model ? carMaster.find(c1=>c1.model===model)?.colors :[]
return (
<div className='container'>

<div className='form-group'>
        <label>Car ID</label>
        <input type="text" className="form-control" id="id" name="id" value={id} placeholder="Enter Id" onChange={this.handleChange} />
      
    </div>
    <div className='form-group'>
        <label>Price</label>
        <input type="text" className="form-control" id="price" name="price" value={price} placeholder="Enter price" onChange={this.handleChange} />
        </div>
        
    <div className='form-group'>
        <label>Millage in kms</label>
        <input type="text" className="form-control" id="kms" name="kms" value={kms} placeholder="Enter Millage" onChange={this.handleChange} />
      
    </div>
    <div className='form-group'>
        <label>Year of Manufactured</label>
        <input type="text" className="form-control" id="year" name="year" value={year} placeholder="Enter year" onChange={this.handleChange} />
        </div>
        <div className='row'>
        <div className='form-group'>
 
 <select className='form-control' name="model" value={model} onChange={this.handleChange}>
     <option  value="">Select the models</option>
     {models.map((c1)=>(
         <option>{c1}</option>
     ))}
 </select>
</div>
   <div className='form-group'>
 
        <select className='form-control' name="color" value={color} onChange={this.handleChange}>
            <option  value="">Select the</option>
            {cities.map((c1)=>(
                <option>{c1}</option>
            ))}
        </select>
    </div>
</div>
 <button className='btn btn-primary btn-sm'onClick={this.handleSumbit}>{this.state.edit ? "update": "sumbit"}</button>
</div>

)
    }
}
export default AddCar;