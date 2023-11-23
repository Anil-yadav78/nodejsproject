const express =require('express');
const mongoose = require('./database/connection');
const bodyParser = require('body-parser');
const path = require('path');
const bcrypt = require('bcrypt');
const session = require("express-session") ;
const cookieParser = require('cookie-parser');


const app = express();




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use(
    session({
        key:'user_id',
        secret:'secret',
        resave:false,
        saveUninitialized: false, 
        cookie:{
            expires:600000,
        },

        })
);

app.set('view engine', 'ejs');
app.use('/assests', express.static('assests'))

app.use('/upload', express.static('upload'))
app.use('/upload2', express.static('upload2'))
// app.use('/packagedetails', express.static('packagedetails'))
app.use(require('./controller/router'));









app.use((req,res ,next)=>{
    if(req.cookies.user_id && !req.session.user){
        res.clearCookie('user_id');
    }
    next();
});


var sessionChecker = (req ,res , next)=>{
    if(req.session.user && req.cookies.user_id){
        res.redirect('/dashboard');
    }else{
        next();
    }
};

app.listen(7000, ()=>{
console.log("listing to 7000 port")
});