import { Text, View, StyleSheet, SafeAreaView, Image, TextInput, TouchableOpacity, Alert, Pressable } from "react-native"
//import { KeyboardEvent } from "react-native";
import { useEffect, useState } from "react";
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { BackHandler } from "react-native";
import { useLayoutEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"
const EmployeeLogin = () => {
    
    const [otp, setOtp] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const navigation = useNavigation();
    const [employeeUserId,setEmployeeUserId] = useState("");
    const [count,setCount] = useState();
    const fetchData1 = async ()=>{
        try{
       const response = await  axios.get("http://10.0.2.2:8000/Employeeprofiles")
            console.log(response.data,"shahd");
            setEmployeeUserId(response.data);
            console.log(employeeUserId.length)
        }catch(err){
            console.log("error get from the profiles",err);
        }
    }
    useEffect(()=>{
        fetchData1();
        },[])
        useEffect(()=>{
            try{
                if(employeeUserId.length>0){
                    navigation.replace("/employeehome");
                }
            }
            catch(err){
                navigation.replace("/employeelogin");
            }
        },[employeeUserId]);
        
   
   
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerTitle:"shahid",
            headerStyle:{
                
                backgroundColor:"white",
                
                
            },
            headerTitleStyle:{
                color:"black",
                fontSize:20,
                fontWeight:"bold",
                marginLeft:"60%"
                
            },
            headerRight:()=>(
             <TouchableOpacity onPress={()=>navigation.navigate("/login")} style = {{width:50,height:40,marginRight:10,marginTop:5,color:"red", shadowOffset: { width: 2, height: 2 }, // Set the shadow offset
             shadowOpacity: 0.5,
             shadowRadius: 5,
             shadowColor:"red",
             elevation: 5, }}>
          <Text style = {{fontSize:18,fontWeight:"bold",color:"red"}}>AD</Text>
             </TouchableOpacity>
             
            )
        });
    },[]);
    useEffect(()=>{
        const backAction = () => {
          Alert.alert(
            'Exit App',
            'Do you want to exit this app?',
            
            [
              {
                text: 'Yes',
                onPress: () => BackHandler.exitApp(),
                
              },
              {
                text: 'No',
                onPress: () => null,
                style: 'cancel',
              },
            ],
            { cancelable: false }
          );
          return true;
        };
    
        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          backAction,
          
        );
    
        return () => backHandler.remove();
      },[])
    
    
    const handleLogin = async ()=>{
        
        
       // console.log(user);
       await axios.post("http://10.0.2.2:8000/employeelogin",phoneNumber).then((response)=>{
            //console.log(response);
            
           //console.log("hello",userId);
            // Decode the JWT to get user information
          

            // Save the user ID in AsyncStorage or use it as needed
            Alert.alert("otp send Successfully");
            console.log(phoneNumber);
             AsyncStorage.setItem("phone",JSON.stringify(phoneNumber));
            setCount(1);
         
        
        }).catch((err)=>{
            Alert.alert("Login Error","Invalid PhoneNumber");
            console.log(err);
        });
    }
    const handleLogin1 = async ()=>{
        
        
       // console.log(user);
       await axios.post("http://10.0.2.2:8000/EmployeeLogin/verify",otp).then((response)=>{
            //console.log(response);
            
           //console.log("hello",userId);
            // Decode the JWT to get user information
          

            // Save the user ID in AsyncStorage or use it as needed
            // AsyncStorage se phone number retrieve karna
  
            navigation.navigate("/employeehome");
            setCount(0);
            
        }).catch((err)=>{
            Alert.alert("Login Error","Invalid PhoneNumber");
            console.log(err);
        });
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
           
            <View style={{ alignItems: "center",marginTop:20 }}>
                <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 12, color: "#041E42" }}>Login In To your Account </Text>
            </View>
            <View style={{ marginTop: 30 }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#D0D0D0", paddingVertical: 5, borderRadius: 5, marginTop: 5 }}>
                    <FontAwesome5 name="passport" size={24} color="black" style={{ marginLeft: 8, color: "gray" }} />
                    <TextInput style={{ color: "gray", marginVertical: 10, width: 300, fontSize: 18 }}
                        onChangeText={(text) => {
                            setPhoneNumber(text);
                        }}
                        secureTextEntry={true}
                        placeholder="Enter Your Mobile Number" value={phoneNumber} />
                </View>

            </View>
            {count!==1 ? (
            <View style = {{marginTop:15}}>
                <TouchableOpacity onPress = {handleLogin}  style = {{width:200,backgroundColor:"#FEBE10",borderRadius:6,marginLeft:"auto",marginRight:"auto",padding:15,marginTop:40}}>
                    <Text style = {{textAlign:"center",fontSize:18,fontWeight:"600",color:"white"}}>Send OTP</Text>
                </TouchableOpacity>
            </View>):(
                <View style = {{marginTop:15}}>
                <TextInput style={{ color: "gray", backgroundColor:"#D0D0D0", marginVertical: 10, width: 300,height:50,borderRadius:10,textAlign:"center",fontSize: 18 }}
                        onChangeText={(text) => {
                            setOtp(text);
                        }}
                        secureTextEntry={true}
                        
                        placeholder="Enter Your otp" value={otp} />
                         <TouchableOpacity onPress = {handleLogin1}  style = {{width:200,backgroundColor:"#FEBE10",borderRadius:6,marginLeft:"auto",marginRight:"auto",padding:15,marginTop:20}}>
                    <Text style = {{textAlign:"center",fontSize:18,fontWeight:"600",color:"white"}}>Verify OTP</Text>
                </TouchableOpacity>
            </View>
            
            )}

           

        </SafeAreaView>

    )
}
const styles = StyleSheet.create({});
export default EmployeeLogin;