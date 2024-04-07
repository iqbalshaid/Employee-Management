import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import adddetails from "./pages/adddetails";
import user from "./pages/User";
import summary from "./pages/Summary";
import markattendance from "./pages/markattendence";
import Home from "./pages/Home";
import Summary1 from "./pages/EmployeeSummary";
import Present from "./pages/EmployeePresent";
import OverTime from "./pages/EmployeeOvertime";
import EmployeeLogin from "./pages/EmployeeLogin";
import EmployeeHome from "./pages/EmployeeHome";
import EmployeeBonus from "./pages/EmployeeBonus";
import EmployeeAbsent from "./pages/EmployeeAbsent";
import employees from "./pages/employee";
import Register from "./pages/AdminRegister";
import AdminLogin from "./pages/AdminLogin";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const StacksBar = ()=>{
    const stack = createStackNavigator();
    
    
    return (
        <NavigationContainer>
            <stack.Navigator>
           
            
               
               <stack.Screen name="/employeelogin" component={EmployeeLogin}  options={{headerShown:true}}/>
               
                <stack.Screen name="/login" component={AdminLogin} options={{headerShown:false}} />
                 <stack.Screen name="/register" component = {Register} options={{headerShown:false}} />
                <stack.Screen name="/adddetails" component={adddetails} options={{headerShown:false}}/>
                <stack.Screen name="/admin" component={employees} options={{headerShown:false}}/>
                <stack.Screen name="/employeeovertime" component={OverTime} options={{headerShown:true}}/>
                <stack.Screen name="/employeepresent" component={Present} options={{headerShown:true}}/>
                <stack.Screen name="/employeeabsent" component={EmployeeAbsent} options={{headerShown:true}}/>
                <stack.Screen name="/employeeBonus" component={EmployeeBonus} options={{headerShown:true}}/>
                <stack.Screen name="/employeehome" component={EmployeeHome} options={{headerShown:true}}/>
                <stack.Screen name="/employeesummary" component={Summary1} options={{headerShown:true}}/>
                <stack.Screen name="/adminhome" component={Home} options={{headerShown:true}}/>
                <stack.Screen name="/adminuser" component={user} options={{headerShown:false}}/>
                <stack.Screen name="/adminsummary" component={summary} options={{headerShown:false}}/>
                <stack.Screen name="/adminattendence" component={markattendance} options={{headerShown:false}}/>
            </stack.Navigator>
        </NavigationContainer>
    )
}
export default StacksBar;