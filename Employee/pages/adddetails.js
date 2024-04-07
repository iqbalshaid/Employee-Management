import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput,
    Pressable,
    Alert,
  } from "react-native";
  import React, { useState } from "react";
  import { useNavigation } from "@react-navigation/native";
  import axios from "axios";
  import { Button } from "react-native-paper";
  import { BackHandler } from "react-native";
  import { useEffect } from "react";
  //import DocumentPicker from "react-native-document-picker"
  const adddetails = () => {
    const navigation = useNavigation();
    const [name, setName] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [dob, setDob] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [joiningDate, setJoiningDate] = useState("");
    const [salary, setSalary] = useState("");
    const [address, setAddress] = useState("");
    const [designation, setDesignation] = useState("");
    const [fileUri,setFileuri] = useState(null);
    const [count,setCount] = useState(0);
    // const chooseFile = async () => {
    //   try {
    //     const res = await DocumentPicker.pick({
    //       type: [DocumentPicker.types.allFiles],
    //     });
    //     setFileuri(res.uri);
    //     // Save file URI to AsyncStorage
    //     const formData = new FormData();
    //   formData.append('image', {
    //     uri: fileUri,
    //     name: 'image',
    //     type: 'image/*', // Adjust the MIME type as per your file type
    //   });
    //   formData.append("phoneNumber",mobileNo);
    //     console.log('File saved to AsyncStorage:', res.uri);
    //     setCount(1);
    //   } catch (err) {
    //     if (DocumentPicker.isCancel(err)) {
    //       console.log('User cancelled the picker');
    //     } else {
    //       console.log('Error picking file:', err);
    //     }
    //   }
    // };
    // const upload = async ()=>{
    //   await axios.post('http://10.0.2.2:8000/image', formData).then(response => {
    //     // Handle response
    //     Alert.alert("upload image successfully");
    //     setCount(0);}
    //   ).catch((err)=>{
    //     Alert.alert("your image is not upload");
    //   })
    
    // }
    useEffect(() => {
      const backAction = () => {
          navigation.goBack();
          return true; // Prevent default behavior (exit app)
      };

      const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

      return () => backHandler.remove(); // Remove the event listener on unmount
  }, [navigation]);
    const handleRegister = async () => {
      const employeeData = {
        employeeName: name,
        employeeId: employeeId,
        designation: designation,
        phoneNumber: mobileNo,
        dateOfBirth: dob,
        joiningDate: joiningDate,
        activeEmployee: true,
        salary: salary,
        address: address,
      };
  try{
      await axios.post("http://10.0.2.2:8000/addEmployee", employeeData);
        
          Alert.alert(
            "Registration Successful",
            "You have been registered successfully"
          );
          navigation.navigate("/admin");
          setName("");
          setEmployeeNumber("");
          setDob("");
          setMobileNo("");
          setSalary("");
          setAddress("");
          setJoiningDate("");
          setDesignation("");
          
        }
        catch(error) {
          Alert.alert(
            "Registration Fail",
            "An error occurred during registration"
          )
          console.log("register failed", error)
        }
    };
    return (
      <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ padding: 10,marginTop:40 }}>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>
            Add a New Employee
          </Text>
  
          <TextInput
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="India"
            placeholderTextColor={"black"}
          />
  
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>
              Full Name (First and last Name)
            </Text>
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
              placeholder="enter your name"
              placeholderTextColor={"black"}
            />
          </View>
  
          <View>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>Employee Id</Text>
            <TextInput
              value={employeeId}
              onChangeText={(text) => setEmployeeId(text)}
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
              placeholder="Employee Id"
              placeholderTextColor={"black"}
            />
          </View>
  
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>Designation</Text>
            <TextInput
              value={designation}
              onChangeText={(text) => setDesignation(text)}
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
              placeholder="Designation"
              placeholderTextColor={"black"}
            />
          </View>
  
          <View>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>
              Mobile Number
            </Text>
            <TextInput
              value={mobileNo}
              onChangeText={(text) => setMobileNo(text)}
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
              placeholder="Mobile No"
              placeholderTextColor={"black"}
            />
          </View>
  
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>
              Date of Birth
            </Text>
            <TextInput
              value={dob}
              onChangeText={(text) => setDob(text)}
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
              placeholder="Enter Date of Birth"
              placeholderTextColor={"black"}
            />
          </View>
          {/* <View style = {{marginVertical:10}}>
          {fileUri && <Text style = {{fontSize:13,color:"red"}}>Selected File: {fileUri}</Text>}
          
     {count=== 0 ? <Button title="Choose File" onPress={chooseFile}  style = {{borderRadius:4,borderWidth:2,backgroundColor:"red",color:"white"}}/>
      :<Button title="Upload" onPress={upload} disabled={!fileUri}  style = {{borderRadius:4,borderWidth:2,backgroundColor:"red",color:"white"}}/>}
       
      
          </View>*/}
          <View>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>Joining Date</Text>
            <TextInput
              value={joiningDate}
              onChangeText={(text) => setJoiningDate(text)}
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
              placeholder="Joining Date"
              placeholderTextColor={"black"}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Text>Active Employee</Text>
            <Text>True</Text>
          </View>
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>Salary</Text>
            <TextInput
              value={salary}
              onChangeText={(text) => setSalary(text)}
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
              placeholder="Enter Salary"
              placeholderTextColor={"black"}
            />
          </View>
  
          <View>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>Address</Text>
            <TextInput
              value={address}
              onChangeText={(text) => setAddress(text)}
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
              placeholder="Enter Address"
              placeholderTextColor={"black"}
            />
          </View>
  
          <Pressable
            onPress={handleRegister}
            style={{
              backgroundColor: "#ABCABA",
              padding: 10,
              marginTop: 20,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
            }}
          >
            <Text style={{ fontWeight: "bold", color: "white" }}>
              Add Employee
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    );
  };
  
  export default adddetails;
  
  const styles = StyleSheet.create({});