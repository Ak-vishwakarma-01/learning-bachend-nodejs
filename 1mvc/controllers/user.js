import { User } from '../models/users.js';

export const usrResister = async(req,res)=>{
    const {name ,kam}  = req.body
    try{
        let user  = await User.create({name,kam});
        console.log("registered");
        res.send("ho gial ho");
    }catch(erre){
        console.log("tanik error bba  "+erre);
        res.send("errror ba ho");
    }
}
