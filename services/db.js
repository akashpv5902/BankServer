//server creation

//import mongoose
const mongoose= require('mongoose');

//state connection string via mongoose

mongoose.connect('mongodb://localhost:27017/BankServer',
{
    useNewUrlParser:true //to avoid unwanted warnings
});

//define bank db model

const User=mongoose.model('user',
{
    //schema creation
    acno:Number,
    username:String,
    password:String,
    balance:Number,
    transaction:[]
});

//export

module.exports={
    User
}