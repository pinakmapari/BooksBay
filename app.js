const express= require('express');
const app= express();
const path = require('path')
const bodyParser = require("body-parser");
const hbs = require("hbs");
const mongoose = require("mongoose");

// const Register= require("./models/userregister");
// const dbURI = 'mongodb+srv://';

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
    res.render('index');
})

app.get('/register', (req,res)=>{
    res.render('register');
})
app.get('/login', (req,res)=>{
    res.render('login');
})
app.post('/login', (req,res)=>{
    res.redirect('index');
})
    
app.listen(8000, ()=>{
        console.log('port no 8000');
    })