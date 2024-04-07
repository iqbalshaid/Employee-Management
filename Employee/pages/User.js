import {
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
    Alert,
  } from "react-native";
  import React, { useState } from "react";
 
  import moment from "moment";
  import { AntDesign } from "@expo/vector-icons";
  import { FontAwesome5 } from "@expo/vector-icons";
  import { Entypo } from "@expo/vector-icons";
  import axios from "axios";
import { useRoute } from "@react-navigation/native";
  import { BackHandler } from "react-native";
  
  const user = () => {

const route = useRoute();
    const [attendanceStatus, setAttendanceStatus] = useState("present");
    const [currentDate, setCurrentDate] = useState(moment());
  
    const goToNextDay = () => {
      const nextDate = moment(currentDate).add(1, "days");
      setCurrentDate(nextDate);
    };
  
    const goToPrevDay = () => {
      const prevDate = moment(currentDate).subtract(1, "days");
      setCurrentDate(prevDate);
    };
  const [advance,setAdvance] = useState("");
  const [overtime,setOvertime] = useState("");
    const formatDate = (date) => {
      return date.format("MMMM D, YYYY");
    };
  //   const [employees, setEmployees] = useState([]);
  //   useEffect(() => {
  //     const fetchEmployeeData = async () => {
  //       try {
  //         const response = await axios.get("http://10.0.2.2:8000/employees");
  //         setEmployees(response.data);
  //       } catch (error) {
  //         console.log("error fetching employee data", error);
  //       }
  //     };
  //     fetchEmployeeData();
  //   }, []);
  //  const selected = employees[0];
  useEffect(() => {
    const backAction = () => {
        navigation.goBack();
        return true; // Prevent default behavior (exit app)
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => backHandler.remove(); // Remove the event listener on unmount
}, [navigation]);
   const submitAttendance =  () => {
      try {
         
        const attendanceData = {
          employeeNumber: route?.params?.number,
          employeeName: route?.params?.name,
          date: currentDate.format("MMMM D, YYYY"),
          status: attendanceStatus,
          advance:advance,
          overtime:overtime,
          
        };
        //console.log(attendanceData);
         axios.post(
          "http://10.0.2.2:8000/attendance",
          attendanceData
        );
  
        
          Alert.alert(`Attendance submitted successfully for ${route?.params?.name}`);
        
      } catch (error) {
        console.log("error submitting attendance", error);
      }
    };
    return (
      <View style={{ flex: 1, backgroundColor: "white",marginTop:60 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginLeft: "auto",
            marginRight: "auto",
            marginVertical: 20,
          }}
        >
          <AntDesign onPress={goToPrevDay} name="left" size={24} color="black" />
          <Text>{formatDate(currentDate)}</Text>
          <AntDesign onPress={goToNextDay} name="right" size={24} color="black" />
        </View>
  
        <Pressable
          style={{
            marginVertical: 10,
            marginHorizontal: 12,
            flexDirection: "row",
            gap: 10,
          }}
        >
        {route?.params?.name?(
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 8,
              padding: 10,
              backgroundColor: "#4b6cb7",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 16 }}>
              {route.params.name.charAt(0)}
            </Text>
          </View>):null}
          <View>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {route?.params?.name}
            </Text>
            <Text style={{ marginTop: 5, color: "gray" }}>
              {route?.params?.designation} ({route?.params?.employeeNumber})
            </Text>
          </View>
        </Pressable>
        <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 12 }}>
          Basic Pay : {route?.params?.salary}
        </Text>
        <View style={{ marginHorizontal: 12 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              letterSpacing: 3,
              marginTop: 7,
            }}
          >
            ATTENDANCE
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 16,
              marginVertical: 10,
            }}
          >
            <Pressable
              onPress={() => setAttendanceStatus("present")}
              style={{
                backgroundColor: "#C4E0E5",
                padding: 10,
                borderRadius: 8,
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                flex: 1,
              }}
            >
              {attendanceStatus === "present" ? (
                <FontAwesome5 name="dot-circle" size={24} color="black" />
              ) : (
                <Entypo name="circle" size={24} color="black" />
              )}
              <Text>Present</Text>
            </Pressable>
  
            <Pressable
              onPress={() => setAttendanceStatus("absent")}
              style={{
                backgroundColor: "#C4E0E5",
                padding: 10,
                borderRadius: 8,
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                flex: 1,
              }}
            >
              {attendanceStatus === "absent" ? (
                <FontAwesome5 name="dot-circle" size={24} color="black" />
              ) : (
                <Entypo name="circle" size={24} color="black" />
              )}
              <Text>Absent</Text>
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 16,
              marginVertical: 10,
            }}
          >
            <Pressable
              onPress={() => setAttendanceStatus("halfday")}
              style={{
                backgroundColor: "#C4E0E5",
                padding: 10,
                borderRadius: 8,
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                flex: 1,
              }}
            >
              {attendanceStatus === "halfday" ? (
                <FontAwesome5 name="dot-circle" size={24} color="black" />
              ) : (
                <Entypo name="circle" size={24} color="black" />
              )}
              <Text>Half Day</Text>
            </Pressable>
  
            <Pressable
              onPress={() => setAttendanceStatus("holiday")}
              style={{
                backgroundColor: "#C4E0E5",
                padding: 10,
                borderRadius: 8,
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                flex: 1,
              }}
            >
              {attendanceStatus === "holiday" ? (
                <FontAwesome5 name="dot-circle" size={24} color="black" />
              ) : (
                <Entypo name="circle" size={24} color="black" />
              )}
              <Text>Holiday</Text>
            </Pressable>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <TextInput
              style={{
                borderRadius: 6,
                marginTop: 10,
                borderWidth: 2,
                borderColor: "#E0E0E0",
                padding: 10,
                flex: 1,
              }}
              value={advance}
              onChangeText={(text)=>setAdvance(text)}
              placeholderTextColor="black"
              placeholder="Advance / Loans"
            />
            <TextInput
              style={{
                borderRadius: 6,
                marginTop: 10,
                borderWidth: 2,
                borderColor: "#E0E0E0",
                padding: 10,
                flex: 1,
              }}
              placeholderTextColor="black"
              placeholder="Extra Bonus"
            />
          </View>
          <View style = {{marginTop:10}}>
            <TextInput 
              style={{
                borderRadius: 6,
                marginTop: 10,
                borderWidth: 2,
                borderColor: "#E0E0E0",
                padding: 10,
                flex: 1,
              }}
              value={overtime}
              onChangeText={(text)=>setOvertime(text)}
              placeholderTextColor="black"
              placeholder="Overtime Hours"
            />
          </View>
          <Pressable
            onPress={submitAttendance}
            style={{
              padding: 15,
              backgroundColor: "#00c6ff",
              width: 200,
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 30,
              borderRadius: 6,
            }}
          >
            <Text
              style={{ textAlign: "center", color: "white", fontWeight: "500" }}
            >
              Submit Attendance
            </Text>
          </Pressable>
        </View>
      </View>
    );
  };
  
  export default user;
  
  const styles = StyleSheet.create({});