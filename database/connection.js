const async = require('hbs/lib/async');
const mongoose = require('mongoose');
const MONGO_URI= process.env.DB;

const connectdb = async ()=>{
    try{
        const con= await mongoose.connect(MONGO_URI,{
            useUnifiedTopology: true,
        })
        console.log(`database connected ${con.connection.host}`);
    }catch(err){
        console.log('database not connected',err);
    }
}

module.exports=connectdb;