import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter from './routes/User.js';
import contactRouter from './routes/Contact.js'
import {config} from 'dotenv'
import cors from 'cors'
import { addcontact, deleteContact, getContactbyId, gteAllcontacts, updatContact } from './controllers/Contact.js';


const app = express();
const port = 3000;

app.use(bodyParser.json());

// .env setup
config({path:'.env'})

// cors
app.use(cors({
    origin:true,
    methods:["POST","GET","PUT","DELETE"],
    credentials:true
}))

// MongoDB setup
mongoose.connect(process.env.MongoUrl, {
    dbName: "Contactmastary"
})
    .then(() => console.log("MongoDB is connected...!"))
    .catch((err) => console.error("MongoDB connection failed:", err));

// user router
app.use('/api/user',userRouter)

// contact Router
app.use('/api/contact',contactRouter)

app.listen(port, () =>
    console.log(`Server is running on port ${port}`)
);
