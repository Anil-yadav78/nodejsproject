const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const signupschema = new mongoose.Schema({

username:{
    type: String, 
},
firstname:{
    type: String, 
},
lastname:{
    type: String, 
},
email:{
    type: String,  
},
password:{
    type: String,  
}
});

signupschema.pre('save', function(next){
    if(!this.isModified('password')){
        return next();
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});
signupschema.methods.comparePassword = function(plaintext , callback){
    return callback(null , bcrypt.compareSync(plaintext, this.password));
};


const newregistion = new mongoose.model('registion',signupschema);
module.exports = newregistion;