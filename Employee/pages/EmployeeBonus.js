import { View,Text,Pressable,Image } from "react-native";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { DataTable } from "react-native-paper";
import { useState } from "react";
import { useEffect } from "react";
import { AntDesign } from '@expo/vector-icons';
import axios from "axios";
import { ScrollView } from "react-native";
import { BackHandler } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EmployeeBonus = ()=>{
    const navigation = useNavigation();
    const [present,setPresent] = useState();
    const [present1,setPresent1] = useState("");

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerTitle:`${present1?.employeeName}`,
            headerStyle:{
                backgroundColor:"white",
                
            },
            headerTitleStyle:{
                color:"black",
                fontSize:20,
                textShadowRadius:2,textShadowColor:"red",
                fontWeight:"bold",
                marginLeft:"45%"
            },
            headerLeft:()=>(
              <Pressable onPress={()=>navigation.goBack()}>
                <Text><AntDesign name="arrowleft" size={24} color="black" /></Text>
                </Pressable>
            )
        });
    },[]);
    
    let phoneNumber;
    useEffect(()=>{
    AsyncStorage.getItem("phone").then((value) => {
        // JSON parse karna
         phoneNumber = JSON.parse(value);
        fetchData();
        fetchData1();
        console.log("Phone Number from AsyncStoragepresent:", phoneNumber);
      }).catch((error) => {
        console.log("Error retrieving phone number:", error);
      });
    },[])
    
   

    
    console.log(phoneNumber,"shahpresent");
    
    const fetchData = async ()=>{
        console.log(phoneNumber,"inside fetch");
        try{
            const respone = await axios.get(`http://10.0.2.2:8000/employeeOne/${phoneNumber}`);
            setPresent(respone.data);
            setPresent1(respone.data[0]);
        }
        catch(err){
            Alert.alert("Error from the backend to get the data",err);
        }
    }
    const [stor,setStor] = useState();
    console.log(phoneNumber,"shahpresent");
    const fetchData1 = async ()=>{
        await axios.get(`http://10.0.2.2:8000/image/${phoneNumber}`).then(response => {
            // Handle response
            setStor(response.data.name);
            console.log(response.data);
          }).catch(error => {
            // Handle error
            console.log("not upload img");
          });
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
        <View style = {{marginTop:10,backgroundColor:"#00CED1"}}>
            <View style = {{marginTop:20,alignItems:"center"}}>
            <Image source = {{uri:`http://10.0.2.2:8000/images1/${stor}`}}  style = {{width:40,height:40,borderRadius:10,marginTop:5}}/>
            <Text style = {{marginVertical:6,fontSize:20,fontWeight:"bold",color:"white",textShadowRadius:5,textShadowColor:"yellow"}}>{present1?.employeeName}</Text></View>
        
                <Text style = {{marginVertical:4,fontSize:14,fontWeight:"500",color:"black",textAlign:"center"}}>Advance Amount</Text>
                <ScrollView vertical = {true}>
                <View style = {{marginTop:10,padding:5,backgroundColor:"#A1FFCE",borderRadius:5}}>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>Date</DataTable.Title>
                        <DataTable.Title>Amount</DataTable.Title>
                    </DataTable.Header>
                    {present?.map((item,index)=>(
                        item?.status==="present"&&
                    <DataTable.Row key={index}>
                        <DataTable.Cell>{item?.date}</DataTable.Cell>
                        <DataTable.Cell>{item?.advance}</DataTable.Cell>
                    </DataTable.Row>
                    ))}
                </DataTable>

                </View>
                </ScrollView>
            
            
        </View>


    )
}
export default EmployeeBonus;
const style = StyleSheet.create({});