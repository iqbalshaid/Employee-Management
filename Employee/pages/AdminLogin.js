import { Text, View, StyleSheet, SafeAreaView, Image, TextInput, TouchableOpacity, Alert } from "react-native"
//import { KeyboardEvent } from "react-native";
import {  useContext, useEffect, useState } from "react";
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { BackHandler } from "react-native";
const AdminLogin = () => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();
    const [adminUserId,setAdminUserId] = useState("");
    const fetchData = async ()=>{
        try{
       const response = await axios.get("http://10.0.2.2:8000/adminprofiles")
        console.log("hello");
            console.log(response.data);
            setAdminUserId(response.data);
        }catch(err){
            console.log("error get from the profiles",err);
        }
    }
  
    useEffect(()=>{
        
        fetchData();
    },[]);
    useEffect(()=>{
        try{
            if(adminUserId.length>0){
                navigation.replace("/adminhome");
            }
        }
        catch(err){
            navigation.replace("/login");
        }
    },[adminUserId]);
    const handleLogin = async ()=>{
        const user = {
            email:email,
            password:password
        }
        try{
       await axios.post("http://10.0.2.2:8000/Adminlogin",user);
            //console.log(response);
            
           //console.log("hello",userId);
            // Decode the JWT to get user information
          

            // Save the user ID in AsyncStorage or use it as needed
            
            navigation.navigate("/adminhome");
        }catch(err){
            Alert.alert("Login Error","Invalid Email");
            console.log(err);
        }
    }
    useEffect(() => {
        const backAction = () => {
            navigation.goBack();
            return true; // Prevent default behavior (exit app)
        };

        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

        return () => backHandler.remove(); // Remove the event listener on unmount
    }, [navigation]);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: "center" ,marginTop:40}}>
           
            <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 12, color: "#041E42" }}>Login In To your Account </Text>
            </View>
            <View style={{ marginTop: 30 }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#D0D0D0", paddingVertical: 5, borderRadius: 5, marginTop: 5 }}>
                    <MaterialIcons style={{ marginLeft: 8, color: "gray" }} name="email" size={24} color="black" />
                    <TextInput style={{ color: "gray", marginVertical: 10, width: 300, fontSize: 18 }}
                        onChangeText={(text) => {
                            setEmail(text)
                        }} placeholder="Enter Your Email" value={email} />
                </View>
            </View>
            <View style={{ marginTop: 30 }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#D0D0D0", paddingVertical: 5, borderRadius: 5, marginTop: 5 }}>
                    <FontAwesome5 name="passport" size={24} color="black" style={{ marginLeft: 8, color: "gray" }} />
                    <TextInput style={{ color: "gray", marginVertical: 10, width: 300, fontSize: 18 }}
                        onChangeText={(text) => {
                            setPassword(text);
                        }}
                        secureTextEntry={true}
                        placeholder="Enter Your Password" value={password} />
                </View>

            </View>
            <View style = {{flexDirection:"row",justifyContent:"space-between",gap:90,alignItems:"center",marginTop:10}}>
            <Text>Keep me Logged in </Text>
            <Text style = {{color:"#007FFF",fontWeight:"500",}}>Forget Password </Text>
            </View>
            <View style = {{marginTop:15}}>
                <TouchableOpacity onPress = {handleLogin} style = {{width:200,backgroundColor:"#FEBE10",borderRadius:6,marginLeft:"auto",marginRight:"auto",padding:15,marginTop:40}}>
                    <Text style = {{textAlign:"center",fontSize:18,fontWeight:"600",color:"white"}}>Login</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={{marginTop:10}} onPress={()=>navigation.navigate("/register")}>
                <Text style = {{color:"gray",fontSize:13,fontWeight:"600",textAlign:"center"}}>Don't Have a Account Then ?SignUp </Text>
            </TouchableOpacity>


        </SafeAreaView>

    )
}
const styles = StyleSheet.create({});
export default AdminLogin;