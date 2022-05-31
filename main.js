require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const connectdb = require('./database/connection')

const app = express();
const PORT = process.env.PORT || 5000;
const DB = process.env.DB;

//database connection 
connectdb();

//middleware
app.use(express.urlencoded({extended:false}));
app.use(express.json({}));

app.use(session({
    secret:'my secret key',
    saveUninitialized : true,
    resave: false
}))

app.use((req,res,next)=>{
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
})

//set template engine
app.set('view engine','ejs');

//route prefix
app.use('',require('./routes/routes'));

app.listen(PORT, ()=>{
    console.log(`server is listening on http://localhost:${PORT}`)
})