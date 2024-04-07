import { View,Text, ScrollView, Alert } from "react-native";
import { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { DataTable } from "react-native-paper";
import { useState } from "react";
import { useEffect } from "react";
import { AntDesign } from '@expo/vector-icons';
import axios from "axios";
import { Alert } from "react-native";
import { BackHandler } from "react-native";

const AdminOvertime = ()=>{
    const navigation = useNavigation();
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerTitle:"Admin",
            headerStyle:{
                backgroundColor:"white",
                
            },
            headerTitleStyle:{
                color:"black",
                fontSize:20,
                fontWeight:"bold",
                marginLeft:"60%"
            },
            headerLeft:()=>(
              <View>
                <AntDesign name="arrowleft" size={24} color="black" />
              </View>
            )
        });
    },[]);
    useEffect(() => {
        const backAction = () => {
            navigation.goBack();
            return true; // Prevent default behavior (exit app)
        };

        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

        return () => backHandler.remove(); // Remove the event listener on unmount
    }, [navigation]);
    const [datas,setDatas] = useState([]);
    const fetchData = async ()=>{
        try{
            const response = await axios.get("http://10.0.2.2:8000/employees1");
            setDatas(response.data);
        }
        catch(err){
            Alert.alert("error get from the backend",err);
        }
    }
    useEffect(()=>{
        fetchData();
    },[]);
    return (
<View>
<View style={{ alignItems: "center",marginTop:20 }}>
<Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 12, color: "#041E42" }}>Admin Seen</Text>
<Text style = {{fontSize:15,fontWeight:"600",marginTop:5,color:"black"}}>Overtime Employee</Text>
</View>

<ScrollView vertical = {true}>
<View style = {{marginTop:10,padding:5,backgroundColor:"#A1FFCE",borderRadius:5,overflow:"hidden"}}>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>Date</DataTable.Title>
                        <DataTable.Title>Name</DataTable.Title>
                        <DataTable.Title>Hours</DataTable.Title>
                    </DataTable.Header>
                    {datas?.map((item,index)=>(
                    
                    <DataTable.Row key={index}>
                    
                        <DataTable.Cell>{item?.date}</DataTable.Cell>
                        <DataTable.Cell>{item?.employeeName}</DataTable.Cell>
                        <DataTable.Cell>{item?.overtime}</DataTable.Cell>

                    </DataTable.Row>
                    ))}
       
                </DataTable>

                </View>
               
</ScrollView>
</View>
    )
}
export default AdminOvertime;