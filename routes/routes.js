const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();
const user = require('../models/users');
const multer = require('multer');

// image uplaod
var storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads');
    },
    filename: function(req,file,cb){
        cb(null,file.fieldname+"_"+Date.now()+"_"+file.originalname)
    },
})

var upload = multer({
    storage: storage,
}).single('image');

// insert an user into database route

router.post('/add', upload , (req,res)=>{
    const users = new user({
        name: req.body.name,
        email: req.body.email,
        phone:req.body.phone,
        image:req.file.filename,
    })
    users.save((err)=>{
        if(err){
            res.json({message: err.message, type: 'danger'})
        }
        else{
            res.session.message = {
                type: 'success',
                message: "user added succesfully"
            };
            res.redirect('/')
        }
    })
})

router.get('/', (req,res)=>{
    res.render('index.ejs',{title:'Home Page'})
})

router.get('/add',(req,res)=>{
    res.render('add_user',{title: 'Add users'})
})


module.exports = router;