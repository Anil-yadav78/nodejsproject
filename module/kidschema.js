const mongoose = require('mongoose');
const kidschema = new mongoose.Schema({

productname:{
    type: String, 
},
productdescription:{
    type: String, 
},
price:{
    type: String, 
},
image:{
    type: String,  
},
discount:{
    type: String,  
}
});

const newproduct = new mongoose.model('kidproduct',kidschema);
module.exports = newproduct;