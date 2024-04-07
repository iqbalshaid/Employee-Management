import { useNavigation } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import { View,Text,Pressable,Image,ScrollView } from "react-native";
import { StyleSheet } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { DataTable } from "react-native-paper";
import axios from "axios";
import { BackHandler } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Present = ()=>{
    const navigation = useNavigation();
    const [present,setPresent] = useState();
    const [present1,setPresent1] = useState("");
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerTitle:`${present1.employeeName}`,
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
              <View>
               <Pressable onPress={()=>navigation.goBack()}> 
               <Text><AntDesign name="arrowleft" size={24} color="black" /></Text></Pressable>
              </View>
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
    
    useEffect(() => {
        const backAction = () => {
            navigation.goBack();
            return true; // Prevent default behavior (exit app)
        };

        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

        return () => backHandler.remove(); // Remove the event listener on unmount
    }, [navigation]); 
    present?.map((item)=>{
        console.log(item.date);
    })
    return (
        <View style = {{marginTop:10,backgroundColor:"#00CED1"}}>
            <View style = {{marginTop:20,alignItems:"center"}}>
            <Image source = {{uri:`http://10.0.2.2:8000/images1/${stor}`}}  style = {{width:40,height:40,borderRadius:10,marginTop:5}}/>
            <Text style = {{marginVertical:6,fontSize:20,fontWeight:"bold",color:"white",textShadowRadius:5,textShadowColor:"yellow"}}>{present1?.employeeName}</Text>
            </View>
            
                <Text style = {{marginVertical:10,fontSize:14,fontWeight:"500",color:"black",textAlign:"center"}}>No. of Present</Text>
                <ScrollView vertical = {true}>
                <View style = {{marginTop:10,padding:5,backgroundColor:"#A1FFCE",borderRadius:5}}>
                <DataTable>
                    <DataTable.Header style={{color:"black",fontWeight:"bold",fontSize:16}}>
                        <DataTable.Title >Date</DataTable.Title>
                        <DataTable.Title>Present</DataTable.Title>
                    </DataTable.Header>
                    {present?.map((item,index)=>(
                        item?.status==="present" &&
                    <DataTable.Row key={index}>
                    
                        <DataTable.Cell>{item?.date}</DataTable.Cell>
                        <DataTable.Cell>P</DataTable.Cell>
                    </DataTable.Row>
                    ))}
                </DataTable>

                </View>
                </ScrollView>
            
        
            
        </View>


    )
}
export default Present;
const style = StyleSheet.create({});