let express = require("express");
let app = express();
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,OPTIONS,POST,PATCH,DELETE,HEAD"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  next();
});
const port = 2410;
app.listen(port, () => console.log(`node app listening on port ${port}!`));

const {carsData}=require("./nodeCarData")
const {carsDataMaster}=require("./nodeCarData")
app.get("/cars", function (req, res) { 
  let fuel=req.query.fuel;
  let type=req.query.type;
  let sort=req.query.sort;
  let minPrice=req.query.minPrice;
  let maxPrice=req.query.maxPrice;
  let data1 = carsData;
  // let data2=carsDataMaster

  data1 = filterParam(data1, "fuel", fuel);
  data1 = filterParam(data1, "type", type); 

  if(minPrice){
    data1=data1.filter((n)=>n.price>=minPrice)
  }
  if(maxPrice){
    data1=data1.filter((n)=>n.price<=maxPrice)
  }
  if(sort==="kms")
  data1=data1.sort((st1,st2)=>st1.kms-st2.kms)
  if(sort==="price")
  data1=data1.sort((st1,st2)=>st1.price-st2.price)
  if(sort==="year")
  data1=data1.sort((st1,st2)=>st1.year-st2.year)

res.send(data1)
})

let filterParam = (arr, name, values) => {
  if (!values) return arr;
  let valuesArr = values.split(",");
  let arr1 = arr.filter((a1) => valuesArr.find((val) => val === a1[name]));
  return arr1;
};


app.post("/cars", (req, res) => {
    const person = req.body;
    carsData.push(person);
    res.send(person);
  });
  app.get("/cars/:id", function (req, res) {
    let id = req.params.id;
    let obj = carsData.find((obj1) => obj1.id === id);
    if (obj) res.send(obj);
    res.send("not found");
  });

  app.put("/cars/:id", function (req, res) {
    console.log("Put called");
    let id = req.params.id;
    const car = req.body;
    console.log(id, car);
    let updatedPerson = { id: id, ...car };
    let index = carsData.findIndex((obj1) => obj1.id === id);
    if (index >= 0) {
      carsData[index] = updatedPerson;
      res.send(updatedPerson);
    } else res.send("not found");
  });

  // app.put("/cars/:id", function (req, res) { 
  //   console.log("Put called");
  //   let id=req.params.id;
  //   let body=req.body;
  //   let index=carsData.findIndex((st)=>st.id===id)
  //   console.log(id,body);
  //   if(index>=0){
  //   let updatedStudent={id:id,...body}
  //   carsData[index]=updatedStudent;
  //   res.send(updatedStudent)
  // }else {
  //   res.status(404).send("no student find")
  // }
  // })  
  app.delete("/cars/:id", function (req, res) { 
    let id=req.params.id;
    console.log(id);
    let index=carsData.findIndex((st)=>st.id==id)
    if(index>=0){
   let deleteStudent= carsData.splice(index,1);
   res.send(deleteStudent)
    }else {
      res.status(404).send("no student find")
    }
  })
