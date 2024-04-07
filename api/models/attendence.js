import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  employeeNumber: {
    type: Number,
    required: true,
  },
  employeeName: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  advance:{
    type:Number,
    required:true
  },
  overtime:{
    type:String,
    required:true
  },
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;