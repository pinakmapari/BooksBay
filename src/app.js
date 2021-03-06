const express = require('express')
const app = express();
const hbs = require('hbs')
const path = require('path')
const ejs= require('ejs')

require("./db/conn");
const Register = require('./models/userregister')
const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, '../public')
const template_path = path.join(__dirname, '../templates/views')
const partials_path = path.join(__dirname, '../templates/partials')

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(express.static(static_path))
app.set("view engine", "hbs")
app.set("views", template_path)
app.set("view engine", "ejs");
hbs.registerPartials(partials_path)
//newly added for demo
const homeStartingContent =
    "This is Bansi";
const aboutContent =
    "hello world";
const contactContent =
    "contact us at";
const posts = [];

app.get('/', (req, res)=>{
    res.render("index1", { startingContent: homeStartingContent, Posts: posts })
});

app.get("/register", (req, res)=>{
    res.render('register')
})

app.get("/login", (req, res)=>{
    res.render('index2')
})
//create a new user in our database
app.post("/register", async (req, res)=>{
    try {
        const password = req.body.password
        const cpassword = req.body.confirmpassword
        if (password === cpassword){
            const registerUser = new Register({
                firstname : req.body.firstname,
                lastname : req.body.lastname,
                email : req.body.email,
                gender : req.body.gender,
                phone : req.body.phone,
                age : req.body.age,
                password : password,
                confirmpassword : cpassword
            })

            const registered = await registerUser.save();
            res.status(201).render("index1");
        }else{
            res.send('Passwords are not matching')
        }
    } catch (error) {
        res.status(400).send(error)
    }
}),

//login check
app.post("/login", async (req,res)=>{
    try {
        const email = req.body.email
        const password = req.body.password

        const  useremail = await Register.findOne({email:email});
        if(useremail.password === password){
            res.status(201).render("index1")
        }else{
            res.send('Invalid login details...')
        }

        console.log(`${email} and password is ${password}`)
    } catch (error) {
        res.status(400).send("Invalid login details...")
    }
})

app.get("/compose", function (req, res) {
    res.render("compose");
});
app.post("/compose", function (req, res) {
    const post = {
        title: req.body.postTitle,
        content: req.body.postBody,
    };
    posts.push(post);

    res.redirect("index1");
});

app.listen(port, ()=>{
    console.log(`Server is live at port ${port}`);
})
