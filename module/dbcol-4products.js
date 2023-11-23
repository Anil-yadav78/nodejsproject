const mongoose = require('mongoose');
const productschema = new mongoose.Schema({

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

const addproduct = new mongoose.model('new',productschema);
module.exports = addproduct;