import { createContext, useEffect, useState } from "react";
const userType  = createContext();
const UserContext =   ({children})=>{
    const [employeeUserId,setEmployeeUserId] = useState("");
    const [adminUserId,setAdminUserId] = useState("");
    const fetchData = async ()=>{
        try{
       await axios.get("http://10.0.2.2:8000/adminprofiles")
        console.log("hello");
            console.log(res.data);
            setAdminUserId(res.data);
        }catch(err){
            console.log("error get from the profiles",err);
        }
    }
    const fetchData1 = async ()=>{
        try{
      await  axios.get("http://10.0.2.2:8000/Employeeprofiles")
            console.log(res.data);
            setEmployeeUserId(res.data);
        }catch(err){
            console.log("error get from the profiles",err);
        }
    }
    useEffect(()=>{
           fetchData();
           fetchData1();
    },[])

    return (
        <userType.Provider value={{adminUserId,setAdminUserId,employeeUserId,setEmployeeUserId}}>{children}</userType.Provider>

    )
}
export {UserContext,userType};
