import mongoose, { model } from "mongoose";
const img = new mongoose.Schema({
    phoneNumber:{
        type:Number
    },
    name:String
})
const image = mongoose.model("images",img);
export default image;