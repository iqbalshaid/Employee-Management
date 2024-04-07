import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { DataTable } from "react-native-paper";
import { BackHandler } from "react-native";
const summary = () => {

  const [currentDate, setCurrentDate] = useState(moment());

  const goToNextMonth = () => {
    const nextMonth = moment(currentDate).add(1, "months");
    setCurrentDate(nextMonth);
  };

  const goToPrevMonth = () => {
    const prevMonth = moment(currentDate).subtract(1, "months");
    setCurrentDate(prevMonth);
  };

  const formatDate = (date) => {
    return date.format("MMMM, YYYY");
  };
  useEffect(() => {
    const backAction = () => {
        navigation.goBack();
        return true; // Prevent default behavior (exit app)
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => backHandler.remove(); // Remove the event listener on unmount
}, [navigation]);
  const [attendanceData, setAttendanceData] = useState([]);
  useEffect(()=>{
  const fetchAttendanceReport = async () => {
    try {
      console.log("how");
      const respone = await axios.get(
        `http://10.0.2.2:8000/attendance-report-all-employees`,
        {
          params: {
            month:11,
            year:2023,
          },
        }
      );
     
      setAttendanceData(respone.data.report);
      //console.log("kon")
      console.log(respone.data.report)
    } catch (error) {
      console.log("Error fetching attendance");
    }
  };
  
    fetchAttendanceReport();
  }, []);
 // console.log(attendanceData);
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
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
          onPress={goToPrevMonth}
          name="left"
          size={24}
          color="black"
        />
        <Text>{formatDate(currentDate)}</Text>
        <AntDesign
          onPress={goToNextMonth}
          name="right"
          size={24}
          color="black"
        />
      </View>

      <View style={{ marginHorizontal: 12 }}>
      {attendanceData.length>0?(
        attendanceData.map((item, index) => (
          <View key={index} style={{ marginVertical: 10 }}>
            <View style={{flexDirection:"row",alignItems:"center",gap:10}}>
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
                  {item?.designation} ({item?.employeeId})
                </Text>
              </View>
            </View>

            <View style={{marginTop:15,margin:5,padding:5,backgroundColor:"#A1FFCE",borderRadius:5}}>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>P</DataTable.Title>
                        <DataTable.Title>A</DataTable.Title>
                        <DataTable.Title>HD</DataTable.Title>
                        <DataTable.Title>H</DataTable.Title>
                        <DataTable.Title>NW</DataTable.Title>
                    </DataTable.Header>
                    <DataTable.Row>
                        <DataTable.Cell>{item?.present}</DataTable.Cell>
                        <DataTable.Cell>{item?.absent}</DataTable.Cell>
                        <DataTable.Cell>{item?.halfday}</DataTable.Cell>
                        <DataTable.Cell>1</DataTable.Cell>
                        <DataTable.Cell>8</DataTable.Cell>
                    </DataTable.Row>
                </DataTable>
            </View>
          </View>
        ))):(null)
      }
            </View>
    </ScrollView>
  );
};

export default summary;

const styles = StyleSheet.create({});