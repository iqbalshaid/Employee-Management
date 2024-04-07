import { View, Text, Pressable, Image, ScrollView } from "react-native";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { AntDesign } from '@expo/vector-icons';
import axios from "axios";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { useEffect } from "react";
import { BackHandler } from "react-native";
// import BarGraph from "../component/Bargraph";
const Summary = () => {
    const navigation = useNavigation();
    const [present, setPresent] = useState();
    const [present1, setPresent1] = useState("");
    const [stor, setStor] = useState("");

   
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: `${present1.employeeName}`,
            headerStyle: {
                backgroundColor: "white",
            },
            headerTitleStyle: {
                color: "black",
                fontSize: 20,
                textShadowRadius: 2, textShadowColor: "red",
                fontWeight: "bold",
                marginLeft: "45%"
            },
            headerLeft: () => (
                <Pressable onPress={() => navigation.goBack()}>
                    <Text>
                        <AntDesign name="arrowleft" size={24} color="black" />
                    </Text>
                </Pressable>
            )
        });
    }, []);

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
   
let countpresent = 0;
let countabsent = 0;
present?.map((item)=>{
    if(item?.status==="present"){
        countpresent +=1;
    }
    else if(item?.status==="absent"){
        countabsent++;
    }
    else{

    }
})
useEffect(() => {
    const backAction = () => {
        navigation.goBack();
        return true; // Prevent default behavior (exit app)
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => backHandler.remove(); // Remove the event listener on unmount
}, [navigation]);
const data = [10, 20, 15, 25, 30]; 
console.log(countpresent,countabsent,"summary");
    return (
        <ScrollView vertical = {true}>
        <View style={{ marginTop: 10, backgroundColor: "#00CED1" }}>
            <View style={{ marginTop: 20, alignItems: "center" }}>
                <Image source="" style={{ width: 40, height: 40, borderRadius: 10, marginTop: 5 }} />
                <Text style={{ marginVertical: 6, fontSize: 20, fontWeight: "bold", color: "white", textShadowRadius: 5, textShadowColor: "yellow" }}>{present1.employeeName}</Text>
            </View>
            <View style={{ marginTop: 20 }}>
                <Text style={{ marginVertical: 4, fontSize: 14, fontWeight: "500", color: "black", textAlign: "center" }}>Summary Report</Text>
            </View>
            {/* <View style={{flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',}}>
      <BarGraph data={data} width={300} height={200} />
    </View>
    */}
        </View> 
        </ScrollView>
    )
}

export default Summary;

const style = StyleSheet.create({});
