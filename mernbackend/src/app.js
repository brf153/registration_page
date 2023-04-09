const express = require('express')
const path = require('path')
const app = express();

require("./db/conn");

const Register = require('./models/registers')
const hbs = require('hbs')

const port = process.env.PORT || 5000;

const static_path = path.join(__dirname, "../public")
const partials_path= path.join(__dirname,"../templates/partials");


app.use(express.static(static_path));

//to get info after submitting in the form
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//bahut important step
app.set('views', path.join(__dirname,"../templates/views"))
app.set("view engine", "hbs");

//Register the partial file
hbs.registerPartials(partials_path)

app.get("/",(req,res)=>{
    res.render("index")
})

app.get("/register",(req,res)=>{
    res.render("register")
})

app.post('/register', async (req,res)=>{
   try{
    // console.log(req.body.firstname);
    // res.send(req.body.firstname)
    const password = req.body.password;
    const confirmpassword = req.body.confirmpassword;

    if(password===confirmpassword){
        const registerEmployee = new Register({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
            confirmpassword: req.body.confirmpassword,
        })

        const registered= await registerEmployee.save();
        res.status(201).render("index");

    }else{
        res.send("Passwords not matching")
    }
   }catch(error){
    res.status(400).send(error);
   }
})

app.listen(port,()=>{
    console.log(`Server started on the port: ${port}`)
})

// console.log(path.jpin__dirname, "../templates/")