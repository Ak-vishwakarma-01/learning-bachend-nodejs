import exp from 'constants';
import express from 'express'
import path from 'path';
const app = express();
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

// middleware       
app.use(express.static(path.join(path.resolve(), 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// MongoDB connection
mongoose.connect("mongodb+srv://akv8272:yporfkBreOt2PHtx@nodeexpressyoutube.6jd4j.mongodb.net/", {
    dbName: "NodeExpressMongoDbYouTube"
}).then(() => console.log("MongoDB is connected...!"))
    .catch((err) => console.error("MongoDB connection failed:", err));

// User Schema and Model
const userSchema = new mongoose.Schema({
    name: String,
    gmail: String,
    password: String
});

const User = mongoose.model("User", userSchema);

const port = 3000;
/*
  CRUD 
  c-creat:-  post
  r-read:-   get
  u-update:- put 
  d-delete:- delete
*/

// app.get('/',(req,res)=>{
//     // console.log("This is home rout");
//     // res.send("this is a home rout");
//     // res.json({success:true,product:[]}) //if we send json data then it becomes an api
//     // res.send("<h1>lele</h1>")

//     // const dir = path.resolve();
//     // console.log(path.resolve());
//     // const textfile = path.join(dir,'/index.txt')
//     // res.sendFile(textfile);
//     res.render('index.ejs')
// })


// app.post('/formData', async(req,res)=>{
//     console.log("form submited")
//     console.log(req.body)
//     const obj = {
//         name: req.body.name,
//         gmail: req.body.email 
//     }
//     await User.create(obj);
//     res.json({lelo:true})
// })

// app.get('/about',(req,res)=>{
//     console.log("this is about page");
//     res.send("this is a aobut");
// })

app.get('/', (req, res) => {
    console.log("this is home rout");
    const token = req.cookies.pken
    console.log(token)
    if(token){
        res.render('logout.ejs')
    }else{
        res.render('login.ejs')
    }
})

app.get('/register', async (req, res) => {
    console.log("register");
    res.render('register.ejs')
})

app.get('/login', (req, res) => {
    console.log("login page");
    res.render('login.ejs');
})

app.get('/logout', (req, res) => {
    console.log("login page");
    res.render('logout.ejs');
})

app.post('/register', async (req, res) => {
    console.log(req.body);
    const obj = {
        name: req.body.name,
        gmail: req.body.gmail,
        password: req.body.password
    }
    let users = await User.findOne({gmail});
    if(users) return res.redirect('/login')
        
    let user = await User.create(obj)
    // res.json({success:true})
    // res.render('/login');
    res.cookie('token', 'lenayacookie', { expires: new Date(Date.now() + 5*6*100000), httpOnly: true})
    res.redirect('/')
}) 

app.post('/login', async (req, res) => {
    const gmail = req.body.gmail
    const password = req.body.password

    let user = await User.findOne({ gmail })

    console.log("login use data", user);

    if (!user) return res.redirect('/register')
    const isMatch = password === user.password
    if (!isMatch) return res.render('login.ejs', { msg: 'INvalid password' })
    if(isMatch)res.redirect('/logout')
    res.cookie('token', 'lenayacookie', { expires: new Date(Date.now() + 5*6*100000), httpOnly: true })
    res.redirect('/')   
})

app.post('/logout', (req, res)=> {
    console.log("logout page");
    res.cookie('token',null,{
        httpOnly:true,
        expires: new Date(Date.now())
    })
    res.redirect('/') 
})


app.listen(port, () => {
    console.log(`Sever is running on port ${port}`);
})