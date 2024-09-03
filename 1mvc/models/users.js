import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:String,
    kam:String,
})

export const User = mongoose.model("User",userSchema);