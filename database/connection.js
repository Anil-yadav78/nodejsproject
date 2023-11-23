const { Module } = require('module');
const mongoose=require('mongoose')
var conn=mongoose.connect("mongodb+srv://anil:anilnode@cluster0.tvumlsf.mongodb.net/?retryWrites=true&w=majority",{
  useNewUrlParser:true,
  useUnifiedTopology:true,
})
.then(()=>console.log('connection succesfully..'))
.catch((err)=>console.log(err));

module.exports =conn;