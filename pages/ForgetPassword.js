import {StyleSheet, Text, TextInput, TouchableOpacity, View,} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import {useState} from "react";
import {LinearGradient} from 'expo-linear-gradient';
import * as components from '../components/index.js';
import {AntDesign} from '@expo/vector-icons';
import * as constant from '../constants';

const {ColoredButton, Logo} = components;

// Define the ForgetPassword component
export default function ForgetPassword({navigation}) {
  // Define the handlers for setting new password and sending confirmation code
  // These are currently placeholders (TODO) for actual logic
  const handleSetPass = () => {
    //password validation
    //TODO: finish password reset logic implementation
    alert("Password has been reset");
  };

  const handleSendCode = () => {
    //TODO: finish send code logic implementation
    alert("Code has been sent");
  };

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Rendering the UI components for the forget password screen
  return (
    <View style={styles.nocentrecontainer}>
      <LinearGradient colors={[constant.LIGHT_BLUE, 'white']} style={styles.background}/>
      <AntDesign name="left" size={23} color={constant.PRIMARY_COLOR} marginLeft={22} marginTop={50}
                 onPress={() => navigation.goBack()}/>
      <StatusBar style="auto"/>
      <Logo/>

      <Text style={styles.title}>Reset Password</Text>
      <Text style={styles.inputTitle}>Email Address</Text>
      <View style={[styles.centrecontainer, {flexDirection: 'row'}]}>
        <View style={styles.emailInput}>
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            placeholderTextColor={constant.NAV_BLUE}
            onChangeText={(email) => setEmail(email)}
          />
        </View>
        <TouchableOpacity style={[styles.codeButton]} onPress={handleSendCode}>
          <Text style={[styles.buttonText]}>{'Send Code'}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.inputTitle}>Confirmation Code</Text>
      <View style={styles.centrecontainer}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholder="Confirmation Code"
            placeholderTextColor={constant.NAV_BLUE}
            onChangeText={(code) => setCode(code)}
          />
        </View>
      </View>
      <Text style={styles.inputTitle}>New Password</Text>
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
      <Text style={styles.inputTitle}>Confirm Password</Text>
      <View style={styles.centrecontainer}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            placeholderTextColor={constant.NAV_BLUE}
            secureTextEntry={true}
            onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
          />
        </View>
      </View>
      <View style={styles.centrecontainer}>
        <ColoredButton title="Confirm" onPress={handleSetPass} buttonColor={'#44299e'}/>
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
  title: {
    color: constant.PRIMARY_COLOR,
    fontSize: 30,
    fontFamily: 'System',
    fontWeight: 'bold',
    marginTop: 30,
    marginLeft: 25,
  },
  inputTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 34,
    marginBottom: 4,
    marginTop: 10,
  },
  emailInput: {
    backgroundColor: "white",
    borderRadius: 25,
    width: "55%",
    height: 35,
    borderColor: constant.DARK_GREY,
    borderWidth: 1,
    marginLeft: 34,
    flex: 2,
  },
  inputView: {
    backgroundColor: "white",
    borderRadius: 25,
    width: "84%",
    height: 35,
    borderColor: constant.DARK_GREY,
    borderWidth: 1,
  },
  textInput: {
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  codeButton: {
    height: 35,
    width: "25%",
    borderRadius: 25,
    backgroundColor: '#44299e',
    marginLeft: 10,
    marginRight: 34,
    justifyContent: 'center',
    flex: 1,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 12,
    color: 'white',
  },
});
