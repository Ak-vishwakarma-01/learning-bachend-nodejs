import { User } from "../models/user.js"
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"

//User Register 
export const userRegister = async (req, res) => {
    const { name, email, password } = req.body
    if(name === '' || email === '' || password === '') 
        return res.status(400).json({ message: 'All fields are required' });
    let user = await User.findOne({ email })
    if (user) return res.json({ messate: "user is alerdy existed" });        
    const hashPass = await bcrypt.hash(password,10)
    user = await User.create({
        name,
        email,
        password:hashPass
    })
    res.json({ message: "user Rgiste succesfully...!", user });
}

// user Login
export const userLogin = async (req, res) => {
    const {email,password} = req.body;
    if(email === '' || password === '') 
        return res.status(400).json({ message: 'All fields are required' });
    const user = await User.findOne({email});
    if (!user) return res.json({ message: "User not found" });
    // first it will hash the input pass then check the hashed pass of db
    const validpass = await bcrypt.compare(password,user.password) 
    if(!validpass) return res.json({message:"password is wrong"})
    const token = jwt.sign({userId:user._id},'@!$##@$%()',{expiresIn:'1d'})
    res.json({ message: `welcome back ${user.name}`,token });
}