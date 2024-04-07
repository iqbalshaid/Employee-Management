import { View,Text,SafeAreaView,TouchableOpacity,Image,TextInput, Alert } from "react-native";
import { useState } from "react";
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { BackHandler } from "react-native";
import { StyleSheet } from "react-native";
const Register = ()=>{
    const [email, setEmail] = useState("");
    const [name,setName] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();
    const handleRegister =  async ()=>{
        console.log("how are you");
        //console.log(name);
        const user = {
            name:name,
            password:password,
            email:email}
       // console.log(user);
        //post request to the backend
        try{
           await axios.post("http://10.0.2.2:8000/Adminregister",user);
            Alert.alert("registration successfully");
        setEmail("");
        setName("");
setPassword("");
navigation.navigate("/login");

        }
        catch(err){
    Alert.alert("not registred Error","An Error occured during registration")
    console.log("error in registration",err);
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
   
    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: "center",marginTop:30 }}>
        
        <View style={{ alignItems: "center",marginTop:20 }}>
            <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 12, color: "#041E42" }}>Login In To your Account </Text>
        </View>
        <View style={{ marginTop: 30 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#D0D0D0", paddingVertical: 5, borderRadius: 5, marginTop: 5 }}>
            <MaterialIcons style = {{marginLeft:8,color:"gray"}} name="perm-contact-calendar" size={24} color="black" />
                <TextInput style={{ color: "gray", marginVertical: 10, width: 300, fontSize: 18 }}
                    onChangeText={(text) => {
                        setName(text)
                    }} placeholder="Enter Your Name" value={name} />
            </View>
        </View>
        <View style={{ marginTop: 20 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#D0D0D0", paddingVertical: 5, borderRadius: 5, marginTop: 5 }}>
            <MaterialIcons style={{ marginLeft: 8, color: "gray" }} name="email" size={24} color="black" />
                <TextInput style={{ color: "gray", marginVertical: 10, width: 300, fontSize: 18 }}
                    onChangeText={(text) => {
                        setEmail(text);
                    }}
                    secureTextEntry={true}
                    placeholder="Enter Your Email" value={email} />
            </View>

        </View>
      
        <View style={{ marginTop: 20 }}>
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
        <View style = {{flexDirection:"row",justifyContent:"-between",gap:90,alignItems:"center",marginTop:10}}>
        <Text>Keep me Logged in </Text>
        <Text style = {{color:"#007FFF",fontWeight:"500",}}>Forget Password </Text>
        </View>
        <View style = {{marginTop:15}}>
            <TouchableOpacity onPress = {handleRegister} style = {{width:200,backgroundColor:"#FEBE10",borderRadius:6,marginLeft:"auto",marginRight:"auto",padding:15,marginTop:40}}>
                <Text style = {{textAlign:"center",fontSize:18,fontWeight:"600",color:"white"}}>Register</Text>
            </TouchableOpacity>
        </View>
        <TouchableOpacity style={{marginTop:10}} onPress={()=>navigation.navigate("/login")}>
            <Text style = {{color:"gray",fontSize:13,fontWeight:"600",textAlign:"center"}}>You Have a Account?Login In </Text>
        </TouchableOpacity>


    </SafeAreaView>

    )
}
const styles = StyleSheet.create({});
export default Register;