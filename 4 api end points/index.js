import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter from './routes/User.js';
import contactRouter from './routes/Contact.js'

import { addcontact, deleteContact, getContactbyId, gteAllcontacts, updatContact } from './controllers/Contact.js';


const app = express();
const port = 3000;

app.use(bodyParser.json());

// MongoDB setup
mongoose.connect("mongodb+srv://akv8272:yporfkBreOt2PHtx@nodeexpressyoutube.6jd4j.mongodb.net/", {
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
