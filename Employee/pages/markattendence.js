import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { BackHandler } from "react-native";
const markattendance = () => {
  const navigation = useNavigation();
  const [currentDate, setCurrentDate] = useState(moment());
  console.log("hello");
  const goToNextDay = () => {
    const nextDate = moment(currentDate).add(1, "days");
    setCurrentDate(nextDate);
  };

  const goToPrevDay = () => {
    const prevDate = moment(currentDate).subtract(1, "days");
    setCurrentDate(prevDate);
  };

  const formatDate = (date) => {
    return date.format("MMMM D, YYYY");
  };

  const [employees, setEmployees] = useState([]);
   useEffect(() => {
     const fetchEmployeeData = async () => {
       try {
      
         const response = await axios.get("http://10.0.2.2:8000/employees");
         setEmployees(response.data);
         console.log(response.data)
       } catch (error) {
         console.log("error fetching employee data", error);
       }
     };
     fetchEmployeeData();
   }, []);
   const [attendance, setAttendance] = useState([]);
  const fetchAttendanceData = async () => {
    try {
      const response = await axios.get(`http://10.0.2.2:8000/attendance`, {
        params: {
          date: currentDate.format("MMMM D, YYYY"),
        },
      });
      setAttendance(response.data);
      //console.log(response.data);
    } catch (error) {
      console.log("error fetching attendance data", error);
    }
  };
  useEffect(() => {
    const backAction = () => {
        navigation.goBack();
        return true; // Prevent default behavior (exit app)
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => backHandler.remove(); // Remove the event listener on unmount
}, [navigation]);

  useEffect(() => {
    fetchAttendanceData();
  }, [currentDate]);
  const employeeWithAttendance = employees.map((employee) => {
    const attendanceRecord = attendance.find(
      (record) => record.employeeId === employee.employeeId
    );

    return {
      ...employee,
      status: attendanceRecord ? attendanceRecord.status : "", // 'Not Marked' or a default status
    };
  });
  return (
    <View style={{ flex: 1, backgroundColor: "white",marginTop:60 }}>
      <Pressable>
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
          <AntDesign
            onPress={goToPrevDay}
            name="left"
            size={24}
            color="black"
          />
          <Text>{formatDate(currentDate)}</Text>
          <AntDesign
            onPress={goToNextDay}
            name="right"
            size={24}
            color="black"
          />
        </View>

        <View style={{ marginHorizontal: 12 }}>
          {employeeWithAttendance.map((item, index) => (
            <Pressable
              onPress={() =>
              navigation.navigate("/adminuser",{
                name: item?.employeeName,
                    number: item?.phoneNumber,
                    salary: item?.salary,
                    designation: item?.designation,
              })
               
              }
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginVertical: 10,
              }}
            >
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
                  {item?.employeeName?.charAt(0)}
                </Text>
              </View>
              <View style={{flex:1}}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  {item?.employeeName}
                </Text>
                <Text style={{ marginTop: 5, color: "gray" }}>
                  {item?.designation} ({item?.employeeNumber})
                </Text>
              </View>
              {item?.status && (
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 8,
                    padding: 10,
                    backgroundColor: "#FF69B4",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{ fontSize: 16, color: "white", fontWeight: "bold" }}
                  >
                    {item.status.charAt(0)}
                  </Text>
                </View>
              )}
            </Pressable>
          ))}
        </View>
      </Pressable>
    </View>
  );
};

export default markattendance;

const styles = StyleSheet.create({});