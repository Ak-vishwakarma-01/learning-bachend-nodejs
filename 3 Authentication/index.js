import express from 'express'
import mongoose from 'mongoose';
import path from 'path'
import { usrResister } from './controllers/user.js';

const app = express();

app.use(express.static(path.join(path.resolve(),'public')))
app.use(express.urlencoded({extended:true}))

mongoose.connect("mongodb+srvoutube.6jd4j.mongodb.net/", {
    dbName: "NodeExpressMongoDbYouTube"
}).then(() => console.log("MongoDB is connected...!"))
    .catch((err) => console.error("MongoDB connection failed:", err));

const port = 3000;

app.get('/',(req,res)=>{
    res.render('index.ejs');
})

app.post('/',usrResister)

app.listen(port,()=>
    console.log(`sever is running on port ${port}`)
);