import { Pressable, StyleSheet, Text, View, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation} from "@react-navigation/native"
import SearchResults from "../component/SearchResults";
import { BackHandler } from "react-native";
const employees = () => {
  const [employees, setEmployees] = useState([]);
  const [input, setInput] = useState("");
  const navigation = useNavigation();
  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get("http://10.0.2.2:8000/employees");
        setEmployees(response.data);
      } catch (error) {
        console.log("error fetching employee data", error);
      }
    };
    fetchEmployeeData();
  }, []);
  useEffect(() => {
    const backAction = () => {
        navigation.goBack();
        return true; // Prevent default behavior (exit app)
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => backHandler.remove(); // Remove the event listener on unmount
}, [navigation]);
  //console.log(employees);
  return (
    <View style={{ flex: 1, backgroundColor: "white",marginTop:60 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <Ionicons
          onPress={() => navigation.goBack()}
          style={{ marginLeft: 10 }}
          name="arrow-back"
          size={24}
          color="black"
        />
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 7,
            gap: 10,
            backgroundColor: "white",
            borderRadius: 3,
            height: 40,
            flex: 1,
          }}
        >
          <AntDesign
            style={{ marginLeft: 10 }}
            name="search1"
            size={20}
            color="black"
          />
          <TextInput
            value={input}
            onChangeText={(text) => setInput(text)}
            style={{ flex: 1 }}
            placeholder="Search"
          />

          {employees.length > 0 && (
            <View>
              <Pressable onPress={() => navigation.navigate("/adddetails")}>
                <AntDesign name="pluscircle" size={30} color="#0072b1" />
              </Pressable>
            </View>
          )}
        </Pressable>
      </View>

      {employees.length > 0 ? (
        <SearchResults data={employees} input={input} setInput={setInput} />
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>No Data</Text>
          <Text>Press on the plus button and add your Employee</Text>
          <Pressable onPress={() => navigation.navigate("/adddetails")}>
            <AntDesign
              style={{ marginTop: 30 }}
              name="pluscircle"
              size={24}
              color="black"
            />
            <Text>hello</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default employees;

const styles = StyleSheet.create({});