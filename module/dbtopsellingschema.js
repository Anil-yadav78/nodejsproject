const mongoose = require('mongoose');
const addproductschema = new mongoose.Schema({

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

const addproduct = new mongoose.model('products',addproductschema);
module.exports = addproduct;