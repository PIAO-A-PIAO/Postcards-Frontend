import {StyleSheet, Text, TextInput, TouchableOpacity, View,} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import {LinearGradient} from 'expo-linear-gradient';
import * as components from '../components/index.js';
import useAuth from "../hooks/useAuth.js";
import {AuthenticationContext} from "../context/Authentication.js";
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {Buffer} from 'buffer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as constant from '../constants.js';
// Import vector icons
import {AntDesign} from '@expo/vector-icons';
import { useLazyLoginQuery } from '../api/apiAuthSlice.js';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../api/authSlice.js';

const {ColoredButton, Logo} = components;


// Defining the Login component
export default function Login({navigation}) { //handle login logic implementation

  // // Using custom authentication hook and context for user authentication
  // const {setAuth} = useAuth();
  // const authentication = useContext(AuthenticationContext);
  const [loginForm, setLoginForm] = useState({
    userEmail: "",
    userPassword: "",
  });
  const [login, loginRes] = useLazyLoginQuery()
  const dispatch = useDispatch()
  const handleLogin = () => {
    login(loginForm)
  };
 
  useEffect(() => {
    if (loginRes.isSuccess && loginRes.currentData?.isLoggedIn) {
      dispatch(setCredentials({user:loginForm.userEmail, token:loginRes.currentData?.token}))
      navigation.navigate('Home')
    }
  }, [loginRes]);


  // Function to update login form state
  const updateLoginForm = (value) => {
    return setLoginForm((prev) => {
      return {...prev, ...value};
    });
  };


  // Rendering the UI components for the login screen
  return (
    <View style={styles.nocentrecontainer}>
      <LinearGradient colors={[constant.LIGHT_BLUE, 'white']} style={styles.background}/>
      <StatusBar style="auto"/>
      <AntDesign name="left" size={23} color={constant.PRIMARY_COLOR} marginLeft={22} marginTop={50}
                 onPress={() => navigation.goBack()}/>
      <Logo/>
      <Text style={styles.hugelogin}>Login</Text>
      <Text style={styles.upinput}>Email Address</Text>
      <View style={styles.centrecontainer}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Email Address"
            placeholderTextColor={constant.NAV_BLUE}
            value={loginForm.userEmail}
            onChangeText={(newEmail) => updateLoginForm({userEmail: newEmail})}
          />
        </View>
      </View>

      <Text style={styles.upinput}>Password</Text>
      <View style={styles.centrecontainer}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Password"
            placeholderTextColor={constant.NAV_BLUE}
            secureTextEntry={true}
            value={loginForm.userPassword}
            onChangeText={(newPassword) => updateLoginForm({userPassword: newPassword})}
          />
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>
      <View style={styles.centrecontainer}>
        <ColoredButton title="Login" onPress={handleLogin} buttonColor={'#44299e'} testID="loginButton"/>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.create}>No account? Create Account</Text>
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
  hugelogin: {
    color: constant.PRIMARY_COLOR,
    fontSize: 40,
    fontFamily: 'System',
    fontWeight: 'bold',
    marginTop: 45,
    marginLeft: 34,
  },
  upinput: {
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 34,
    marginBottom: 6,
    marginTop: 22,
  },
  inputView: {
    backgroundColor: "white",
    borderRadius: 25,
    width: "84%",
    height: 40,
    borderColor: constant.DARK_GREY,
    borderWidth: 1,
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  forgot_button: {
    marginBottom: 0,
    marginLeft: 34,
    fontSize: 14,
    marginTop: 3,
    color: constant.PRIMARY_COLOR,
  },
  create: {
    color: constant.PRIMARY_COLOR,
    fontSize: 16,
    marginTop: 12,
  },
});