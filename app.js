const express= require('express');
const app= express();
const path = require('path')
const bodyParser = require("body-parser");
const hbs = require("hbs");
const mongoose = require("mongoose");

// const Register= require("./models/registers");
// const dbURI = 'mongodb+srv://brainless_heads:bansi_mam@project1.uubcc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const static_path = path.join(__dirname, "/public")
const viewPath = path.join(__dirname, "/templates/views")
const partialsPath = path.join(__dirname, "/templates/partials")

app.use(express.static(static_path))
app.set('views',viewPath)
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)


// mongoose.connect(dbURI,  {useNewUrlParser: true, useUnifiedTopology: true })
//     .then((result)=> console.log('connected'))
//     .catch((err)=> console.log('error'));


app.get("/", (req,res)=>{
    res.render('index.hbs');
})

app.get('/register', (req,res)=>{
    res.render('register');
})
app.get('/login', (req,res)=>{
    res.render('register');
})
    
app.listen(8000, ()=>{
        console.log('port no 8000');
    })