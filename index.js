// //server creation

 //const { application } = require("express");

// //1 import express
 
const express = require('express')
//import dataservice
const dataservice = require('./services/data.service')

// import cors

const cors = require('cors')


// //2 create an application using the express

const app = express()

//to parse json from req body
app.use(express.json())//type conversion

//give command to share data via cors

app.use(cors({
    origin:'http://localhost:4200'
}))

// //3create a port number

 app.listen(3000,() => {
    console.log("listening on the port 3000");
 })

 
 //application specific middleware
//  const appMiddleware = (req,res,next)=>{
//     console.log('application specific middleware');
//     next();
//  }
//  app.use(appMiddleware)


 const jwt=require('jsonwebtoken')
 //router specific middleware
 const jwtMiddleware =(req,res,next)=>
 {
    console.log('Router specific middleware ');
    // const token=req.body.token;
    const token=req.headers['x-access-token'];

    //verify token - verify()
    const data=jwt.verify(token,'superkey2022')
    console.log(data);
    next();
 }

// //4 resolving HTTP request 
// //get,post,put,patch,delete

// //resolving get request

// app.get('/',(req,res) => {
//     res.send('Get request')
// })


// //resolving post request

// app.get('/',(req,res) => {
//     res.send('post request')
// })

// app.put('/',(req,res)=>{
//     res.send('put request')
// })
// app.delete('/',(req,res)=>{
//     res.send('delete request')
// })
// app.patch('/',(req,res)=>{
//     res.send('patch request')
// })
// app.post('/',(req,res)=>{
//     res.send('post request')
// })



app.post('/register',(req,res)=>
{
    console.log(req.body);
     dataservice.register(req.body.acno,req.body.username,req.body.password)
    .then(result=>{
        res.status(result.statusCode).json(result)

    })
   
    // if(result){
    //     res.send('register successful');
    // }
    // else{
    //     res.send('user already registered')
    // }
    
})

app.post('/login',(req,res)=>
{
    console.log(req.body);
     dataservice.login(req.body.acno,req.body.password)
     .then(result=>{
        res.status(result.statusCode).json(result)

     })
  

})

app.post('/deposit',jwtMiddleware,(req,res)=>
{
    console.log(req.body);
   dataservice.deposit(req.body.acno,req.body.password,req.body.amount)
   .then(result=>{
    res.status(result.statusCode).json(result)
   })
    
})

app.post('/withdraw',jwtMiddleware,(req,res)=>
{
    console.log(req.body);
    dataservice.withdraw(req.body.acno,req.body.password,req.body.amount)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})

app.post('/transaction',jwtMiddleware,(req,res)=>
{
    console.log(req.body);
    dataservice.getTransaction(req.body.acno)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
    
})