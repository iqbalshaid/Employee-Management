import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    EmployeeId:{
        type:String,
        
    },
    employeeName:{
        type:String,
        require:true
    },
    designation:{
       type:String,
       required:true 
    },
    joiningDate:{
        type:String,
        required:true
    },
    dateOfBirth:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
        required:true
    },
    activeEmployee:{
        type:Boolean,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Employee = mongoose.model("Employee",employeeSchema);

export default Employee;