const express = require('express')
const app = express();
const hbs = require('hbs')
const path = require('path')

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
hbs.registerPartials(partials_path)
console.log(partials_path)
console.log(template_path)
app.get('/', (req, res)=>{
    res.render("index")
});

app.get("/register", (req, res)=>{
    res.render('register')
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
                password : req.body.password,
                confirmpassword : req.body.confirmpassword
            })

            const registered = await registerUser.save();
            res.status(201).render("index");
        }else{
            res.send('Passwords are not matching')
        }
        console.log(req.body.firstname);
        res.send(req.body.firstname)
    } catch (error) {
        res.status(400).send(error)
    }
})

app.listen(port, ()=>{
    console.log(`Server is live at port ${port}`);
})
