import { StyleSheet, Text, View, ScrollView, Pressable,Image,Alert,TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, Entypo, Ionicons, Octicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';
import {useNavigation} from "@react-navigation/native";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { AntDesign } from '@expo/vector-icons';
import { BackHandler } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLayoutEffect } from "react";
const EmployeeHome = () => {
    const navigation = useNavigation();
    const logout =  async ()=>{
      try{
      await axios.post("http://10.0.2.2:8000/employeelogout")
      Alert.alert("Your are successfully logout"),
      navigation.navigate("/employeelogin");
    AsyncStorage.removeItem("phone")}
      catch(err){
        Alert.alert("not post the data from the backend");
      }
    }
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
    const [present,setPresent] = useState();
    const [present1,setPresent1] = useState();
    let phoneNumber;
    useEffect(()=>{
    AsyncStorage.getItem("phone").then((value) => {
        // JSON parse karna
         phoneNumber = JSON.parse(value);
        fetchData();
      
        console.log("Phone Number from AsyncStoragepresent:", phoneNumber);
      }).catch((error) => {
        console.log("Error retrieving phone number:", error);
      });
    },[])
    
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
  console.log(present1,"dfgt")
  if (present && present.length > 0) {
    // Check if `present` is defined and not empty
    console.log(present?.employeeNumber, "saale");
    // Using optional chaining to access `employeeNumber` property
  } else {
    console.log("present array is either undefined, null, or empty");
  }
  const [refreshing,setRefreshing] = useState(false);
  useLayoutEffect(() => {
    const refreshApp = () => {
      setRefreshing(true);
      // Perform any additional refresh logic here...
      setTimeout(() => {
        // Simulate refreshing for 2 seconds
        setRefreshing(false);
      }, 2000);
    };

    navigation.setOptions({
      headerLeft: () => null, // Remove headerLeft
      headerTitle:"Employee Home",
          headerStyle:{
              backgroundColor:"white",
              
          },
          headerTitleStyle:{
              color:"green",
              fontSize:20,
              textShadowRadius:2,textShadowColor:"red",
              fontWeight:"bold",
              marginLeft:"35%"
          },
      headerRight: () => (
        <TouchableOpacity onPress={refreshApp}>
          <View style={{ marginRight: 10 }}>
           <Text> <AntDesign name="reload1" size={16} color="black"  style = {{fontWeight:"900"}}/></Text>
          </View>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <ScrollView>
    {refreshing ? (Alert.alert("Your data is refreshing")):(
      <LinearGradient colors={["#7F7FD5", "#E9E4F0"]} style={{ flex: 1}}>
        <View>
          <View>
            <Image sourse = {{}}  style = {{width:40,height:40,borderRadius:10,alignItems:"center",marginTop:5}}/>
            <Text style = {{textAlign:"center",marginVertical:6,fontSize:30,fontFamily:"Times New Roman",fontWeight:"bold",color:"white",textShadowRadius:5,textShadowColor:"yellow"}}>{present1?.employeeName}</Text>
          </View>
          <View
            style={{
              marginTop: 20,
              backgroundColor: "white",
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderRadius: 7,
            }}
          >
            <Pressable
            onPress={()=>navigation.navigate("/employeepresent")}
              style={{
                backgroundColor: "#BE93C5",
                borderRadius: 6,
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 10,
              }}
            >
              <View
                style={{
                  padding: 7,
                  width: 45,
                  height: 45,
                  borderRadius: 7,
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="newspaper-outline" size={24} color="black" />
              </View>
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 16,
                  fontWeight: "600",
                  flex: 1,
                }}
              >
                No. of Present
              </Text>
              <View
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 7,
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Entypo name="chevron-right" size={24} color="black" />
              </View>
            </Pressable>
            <Pressable
            onPress={()=>navigation.navigate("/employeeBonus")}
              style={{
                backgroundColor: "#BE93C5",
                borderRadius: 6,
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 10,
              }}
            >
              <View
                style={{
                  padding: 7,
                  width: 45,
                  height: 45,
                  borderRadius: 7,
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Octicons name="report" size={24} color="black" />
              </View>
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 16,
                  fontWeight: "600",
                  flex: 1,
                }}
              >
                Taken Bonus
              </Text>
              <View
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 7,
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Entypo name="chevron-right" size={24} color="black" />
              </View>
            </Pressable>
            <Pressable
            onPress={()=>navigation.navigate("/employeeovertime")}
              style={{
                backgroundColor: "#BE93C5",
                borderRadius: 6,
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 10,
              }}
            >
              <View
                style={{
                  padding: 7,
                  width: 45,
                  height: 45,
                  borderRadius: 7,
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="people" size={24} color="black" />
              </View>
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 16,
                  fontWeight: "600",
                  flex: 1,
                }}
              >
                Overtime Duty
              </Text>
              <View
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 7,
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Entypo name="chevron-right" size={24} color="black" />
              </View>
            </Pressable>
            <Pressable
            onPress={()=>navigation.navigate("/employeesummary")}
              style={{
                backgroundColor: "#BE93C5",
                borderRadius: 6,
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 10,
              }}
            >
              <View
                style={{
                  padding: 7,
                  width: 45,
                  height: 45,
                  borderRadius: 7,
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="people" size={24} color="black" />
              </View>
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 16,
                  fontWeight: "600",
                  flex: 1,
                }}
              >
                Summary Report
              </Text>
              <View
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 7,
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MaterialIcons name="summarize" size={24} color="black" />
              </View>
            </Pressable>
            <Pressable
            onPress={()=>navigation.navigate("/employeeabsent")}
              style={{
                backgroundColor: "#BE93C5",
                borderRadius: 6,
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 10,
              }}
            >
              <View
                style={{
                  padding: 7,
                  width: 45,
                  height: 45,
                  borderRadius: 7,
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="people" size={24} color="black" />
              </View>
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 16,
                  fontWeight: "600",
                  flex: 1,
                }}
              >
                No. of Absent
              </Text>
              <View
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 7,
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Entypo name="chevron-right" size={24} color="black" />
              </View>
            </Pressable>
            <Pressable
            onPress={logout}
              style={{
                backgroundColor: "#BE93C5",
                borderRadius: 6,
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 10,
              }}
            >
              <View
                style={{
                  padding: 7,
                  width: 45,
                  height: 45,
                  borderRadius: 7,
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="people" size={24} color="black" />
              </View>
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 16,
                  fontWeight: "600",
                  flex: 1,
                }}
              >
                SignOut
              </Text>
              <View
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 7,
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MaterialIcons name="logout" size={24} color="black" />
              </View>
            </Pressable>
          </View>
         
        </View>
      </LinearGradient>
      )}
    </ScrollView>
  );
};

export default EmployeeHome;

const styles = StyleSheet.create({});