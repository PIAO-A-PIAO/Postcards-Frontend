import {Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import {useState} from "react";
import {LinearGradient} from 'expo-linear-gradient';
import * as components from '../components/index.js';
import {AntDesign} from '@expo/vector-icons';
import * as constant from '../constants';

const {ColoredButton, Logo} = components;

// Define the SignUp component
export default function SignUp({navigation}) {
  // Function to handle the signup process (currently placeholder for future implementation)
  const handleSignup = () => {
    //check the user input
    //   navigation.navigate('Home');
    //TODO: finish signup logic implementation
    Alert.alert("Sign Up functionality is not ready yet")
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  // Rendering the UI components for the signup screen
  return (
    <View style={styles.nocentrecontainer}>
      <LinearGradient colors={[constant.LIGHT_BLUE, 'white']} style={styles.background}/>
      <AntDesign name="left" size={23} color={constant.PRIMARY_COLOR} marginLeft={22} marginTop={50}
                 onPress={() => navigation.goBack()}/>
      <StatusBar style="auto"/>
      <Logo/>
      <Text style={styles.hugeSignup}>Sign Up</Text>
      <Text style={styles.upInput}>User Name</Text>
      <View style={styles.centrecontainer}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholder="User name"
            placeholderTextColor={constant.NAV_BLUE}
            onChangeText={(username) => setUsername(username)}
          />
        </View>
      </View>
      <Text style={styles.upInput}>Email Address</Text>
      <View style={styles.centrecontainer}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholder="Email Address"
            placeholderTextColor={constant.NAV_BLUE}
            onChangeText={(email) => setEmail(email)}
          />
        </View>
      </View>
      <Text style={styles.upInput}>Password</Text>
      <View style={styles.centrecontainer}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            placeholderTextColor={constant.NAV_BLUE}
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View>
      </View>
      <View style={styles.centrecontainer}>
        <ColoredButton title="Sign Up" onPress={handleSignup} buttonColor={'#44299e'}/>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.create}>Already Have An Account? Login!</Text>
        </TouchableOpacity>
        {/*//TODO: nend an onPress logic implementation */}
        <TouchableOpacity style={styles.googleButton}>
          <Image style={styles.image} source={require("../assets/google.png")}/>
          <Text style={styles.googleText}>Continue with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  nocentrecontainer: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  centrecontainer: {
    alignItems: "center",
  },
  hugeSignup: {
    color: constant.PRIMARY_COLOR,
    fontSize: 40,
    fontFamily: 'System',
    fontWeight: 'bold',
    marginTop: 45,
    marginLeft: 34,
  },
  upInput: {
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 34,
    marginBottom: 6,
    marginTop: 15,
  },
  inputView: {
    backgroundColor: "white",
    borderRadius: 25,
    width: "84%",
    height: 40,
    borderColor: "#444444",
    borderWidth: 1,
  },
  textInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  create: {
    color: constant.PRIMARY_COLOR,
    fontSize: 16,
    marginTop: 12,
  },
  googleButton: {
    width: "84%",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    marginTop: '5%',
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 40
  },
  googleText: {
    color: "black",
    fontSize: 16,
    fontFamily: 'System',
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 30,
    marginLeft: 56,
  },
});
  