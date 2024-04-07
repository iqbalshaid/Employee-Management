import express from "express"
import bodyParser from "body-parser";
import mongoose from "mongoose";
import moment from "moment";
import Employee from "./models/employee.js"
import Attendance from "./models/attendence.js"
import admin from "./models/admin.js";
import bcrypt from "bcryptjs"
import Jwt  from "jsonwebtoken";
import cookieParser from "cookie-parser";
import twilio from "twilio";
import crypto from "crypto"
import multer from "multer";
import image from "./models/Image.js";
// client(process.env.TWILIOACCOUNTID,process.env.TWILIOTOKEN);
//const client = new twilio.Twilio(process.env.TWILIOACCOUNTID,process.env.TWILIOTOKEN);
const client = twilio("AC184c1cd536748e8822a266410dc842fb", "45d550dfd27e35676ad0bd0893b0872f");
let OTP;
const app = express();
const port = 8000;
import cors from "cors";
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const uri = "mongodb+srv://shahidiqbal63209:Shahid786@cluster0.lbxy9hu.mongodb.net/ ";
const conn = async ()=>{
  try{
  mongoose.connect(uri
 , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
     console.log("Connected to MongoDB");
}
catch(error) {
    console.log("Error connecting to MongoDB", error);
  };
}

app.listen(port, () => {
  conn();
  console.log("Server is running on port 8000");
});
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the destination folder where images will be stored
    cb(null, './public/images1');
  },
  filename: function (req, file, cb) {
    // Use the original filename provided by the user
    cb(null, file.originalname);
  }
});

// Initialize multer with custom storage options
const upload = multer({ storage: storage });

console.log("how");
//endpoint to register a employee
app.post("/Adminregister",async (req,res)=>{
  try{
    
  const {email,password,name} = req.body;
  console.log(email);
  const val =  await admin.findOne({email});
  console.log(val);
  if(val!=null){
    console.log("hello");
    return res.status(404).json("you have already registered");
  }
  const data = new admin({name,email,password});
  
  await data.save();
  res.status(200).json("you have registered successfully");

}
catch(err){
  return res.status(500).json("something error on registeration");
}


})
const generateSecretKey = ()=>{
      const secretKey = crypto.randomBytes(32).toString("hex");
      return secretKey;
  }
  const secretKey = generateSecretKey();
app.post("/Adminlogin",async (req,res)=>{
  try{
    const {email,password} = req.body;
    
    const val = await admin.findOne({email});
    if(val==null){
      console.log("me",email);
      return res.status(404).json("not found your email");
    }
    const dat = bcrypt.hashSync(val.password,10);
    const pass = bcrypt.compareSync(password,dat);
    console.log(pass,password,val.password);
    if(pass==true){
      const expires = 14;
      console.log("me",val._id,secretKey);
      const token = Jwt.sign({userID:val._id},secretKey);
      res.cookie('token', token, { httpOnly: true 
      },{expiresIn:expires * 24 * 60 * 60});
      console.log("saala");
    console.log(req.cookies.token);
      res.status(200).json(val);
      
    }

  }
  catch(err){
  res.status(500).json("you are not login");
  }
})
app.get('/adminprofiles', (req, res) => {
  const token = req.cookies.token;
 // console.log(req.cookies.token);
  console.log("hrello",token)
  if (!token) {
    return res.status(401).send('Unauthorized');
  }
console.log("me hoo kon")
  try {
   //console.log(process.env.JWT);
   const expiresInDays = 14;
   console.log("me hoo kon1")
    const decoded = Jwt.verify(token, secretKey,{expiresIn:expiresInDays * 24 * 60 * 60});
    //console.log("hello",decoded);
    const userId = decoded.userId;
    
    res.send(`User ID: ${userId}`);
  } catch (error) {
    res.status(401).send('Unauthorized');
  }
});
app.post("/employeelogin",async (req,res)=>{
  try{
  const number = req.body;
  console.log(Object.keys(number)[0]);
  const phoneNumber = Object.keys(number)[0];
  const val = await Employee.find({phoneNumber});
  console.log("me",val);
  if(!val){
    console.log("me");
    return res.status(401).send("you are not found");
  }
  let digit = "0123456789";
  OTP = "";
  // console.log("me");
  // const dat = bcrypt.hashSync(val.phoneNumber,10);
  // console.log(dat);
  // const data = bcrypt.compareSync(phoneNumber,dat);
  
  // if(!data){
    // const expires = 14;
    // const token = Jwt.sign({userID:val._id},process.env.jwt);
    // res.cookie('token1', token, { httpOnly: true 
    // },{expiresIn:expires * 24 * 60 * 60});
    // res.status(200).json(val.phoneNumber);
    for(let i=0;i<6;i++){
      OTP += digit[Math.floor(Math.random()*10)];
    }
    
    await client.messages.create({
      body:`Your Mobile Number is ${phoneNumber} and ${OTP}`,
      //messagingServiceSid:"MG867fcd84d84b88ecfe4a55c992caa933	",
      to:`+91${phoneNumber}` ,
      from :"+16562203462"
    });
    res.status(200).json("msg send successfully");
  console.log(OTP);

  
}
catch(err){
res.status(500).json("you are not login");
}
})
app.post("/EmployeeLogin/verify",async (req,res)=>{
  try{
const ot = req.body;
console.log(ot);
const otp = Object.keys(ot)[0];
console.log(otp);
console.log(OTP);
if(otp!=OTP){
  console.log(otp);
  return res.status(400).json("incorrect otp");
}
console.log("hello");
 const expires = 14;
    const token = Jwt.sign({userId:otp},secretKey);
    console.log(token);
    res.cookie('token1', token, { httpOnly: true 
    },{expiresIn:expires * 24 * 60 * 60});
    res.status(200).json(token);

  }
  catch(err){
    res.status(500).json("not connected to frontend");
  }

})
app.get('/Employeeprofiles', (req, res) => {
  try{
  const token1 = req.cookies.token1;
  console.log(req.cookies.token1);
  console.log("hrelloemployee",token1)
  if (!token1) {
    return res.status(401).send('Unauthorized');
  }
console.log("me hoo kon")
  
   //console.log(process.env.JWT);
   const expiresInDays = 14;
   console.log("me hoo kon")
    const decoded = Jwt.verify(token1, secretKey,{expiresIn:expiresInDays * 24 * 60 * 60});
    //console.log("hello",decoded);
    const userId = decoded.userId;
    console.log(userId);
    res.send(`User ID: ${userId}`);
  } catch (error) {
    res.status(401).send('Unauthorized');
  }
});
app.post("/addEmployee", async (req, res) => {
  //console.log("me");
  try {
    const {
      employeeName,
      EmployeeId,
      designation,
      phoneNumber,
      dateOfBirth,
      joiningDate,
      activeEmployee,
      salary,
      address,
    } = req.body;
    console.log(employeeName);
    //create a new Employee

    const newEmployee = new Employee({
      employeeName,
      EmployeeId,
      designation,
      phoneNumber,
      dateOfBirth,
      joiningDate,
      activeEmployee,
      salary,
      address,
    });
   console.log("hello");
    await newEmployee.save();

    res
      .status(201)
      .json({ message: "Employee saved successfully", employee: newEmployee });
  } catch (error) {
    console.log("Error creating employee", error);
    res.status(500).json({ message: "Failed to add an employee" });
  }
});

//endpoint to fetch all the employees
app.get("/employees", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve the employees" });
  }
});
app.get("/employees1", async (req, res) => {
  try {
    const employees = await Attendance.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve the employees" });
  }
});

console.log("how");
app.post("/image",upload.single("image"),async (req,res)=>{
  try{
    const {phoneNumber} = req.body;
  
   const img = new Image({
    phoneNumber:req.body,
    name:req.file.originalname,
   })
   await img.save();
   res.set("Content-Type", "image/jpeg");
   res.status(200).json(img);
  }
  catch(err){
    res.status.json("error to storing the image");
  }
})
app.get("/image/:mobile",async(req,res)=>{
  try{
    const phoneNumber = req.params.mobile;
    const val = await Image.findOne({phoneNumber});
    if(!val){
      res.status(401).json("image was not present");
    }
    console.log(val,"sh");
    res.set("Content-Type", "image/jpeg");
    res.status(200).json(val);
  }
  catch(err){
    res.status(500).json({ message: "Error retrieveing" });

  }
})
app.post("/attendance", async (req, res) => {

  try {
    console.log("hello");
    const { employeeNumber, employeeName, date, status,advance,overtime } = req.body;
    console.log(employeeNumber);
    const existingAttendance = await Employee.find({ employeeNumber});
    console.log(existingAttendance);
    if (!existingAttendance) {
      existingAttendance.status = status;
      console.log("me");
      await existingAttendance.save();
      res.status(200).json(existingAttendance);
    } 
      const newAttendance = new Attendance({
        employeeNumber,
        employeeName,
        date,
        status,
        advance,
        overtime,
  })
      
       newAttendance.save();
      console.log("me,sh");
      res.status(200).json(newAttendance);
    }
  catch (error) {
    res.status(500).json({ message: "Error submitting attendance" });
  }
});
app.get("/employeeOne/:mobile",async (req,res)=>{
  try{
    const employeeNumber = req.params.mobile;
    console.log(req.params.mobile,"shah");
    const val = await Attendance.find({employeeNumber});
    if(!val){
      res.status(404).json("your are not registered by admin");
    }
    res.status(200).json(val);

  }
  catch(err){
    res.status(500).json("you are not get the data");
  }
})

app.get("/attendance", async (req, res) => {
  try {
    const { date } = req.query;

    // Find attendance records for the specified date
    const attendanceData = await Attendance.find({ date: date });

    res.status(200).json(attendanceData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching attendance data" });
  }
});
app.post("/employeelogout",async (req,res)=>{
  try{
    console.log("me0");
    res.clearCookie("token1");
    res.status(200).json("successfully logout");
  }
  catch(err){
    res.status(400).json("not get the data from the backend");
  }
})
app.post("/adminlogout",async (req,res)=>{
  try{
    console.log("me0");
    res.clearCookie("token");
    console.log(req.cookies.token);
    res.status(200).json("successfully logout");
  }
  catch(err){
    res.status(400).json("not get the data from the backend");
  }
})

app.get("/attendance-report-all-employees", async (req, res) => {
  try {
    const { month, year } = req.query;

    if (!Number.isInteger(parseInt(month)) || parseInt(month) < 1 || parseInt(month) > 12) {
      return res.status(400).json({ message: "Invalid month input" });
    }

    const selectedMonth = parseInt(month);
    const selectedYear = parseInt(year);

    const report = await Attendance.aggregate([
      {
        $match: { date: { $ne: null } }, // Add this stage to filter out null dates
      },
      {
        $project: {
          attendanceDate: { $toDate: "$date" },
          status: 1,
          employeeId: 1,
        },
      },
      {
        $match: {
          $expr: {
            $and: [
              { $eq: [{ $month: "$attendanceDate" }, selectedMonth] },
              { $eq: [{ $year: "$attendanceDate" }, selectedYear] },
            ],
          },
        },
      },
      {
        $group: {
          _id: "$employeeId",
          present: { $sum: { $cond: { if: { $eq: ["$status", "present"] }, then: 1, else: 0 } } },
          absent: { $sum: { $cond: { if: { $eq: ["$status", "absent"] }, then: 1, else: 0 } } },
          halfday: { $sum: { $cond: { if: { $eq: ["$status", "halfday"] }, then: 1, else: 0 } } },
          holiday: { $sum: { $cond: { if: { $eq: ["$status", "holiday"] }, then: 1, else: 0 } } },
        },
      },
      {
        $lookup: {
          from: "employees",
          localField: "_id",
          foreignField: "employeeId",
          as: "employeeDetails",
        },
      },
      {
        $unwind: "$employeeDetails",
      },
      {
        $project: {
          _id: 1,
          present: 1,
          absent: 1,
          halfday: 1,
          employeeName: "$employeeDetails.employeeName",
          designation: "$employeeDetails.designation",
          employeeId: "$employeeDetails.employeeId",
        },
      },
    ]);

    console.log(report);
    res.status(200).json({ report });
  } catch (error) {
    console.error("Error generating attendance report:", error);
    res.status(500).json({ message: "Error generating the report" });
  }
});
