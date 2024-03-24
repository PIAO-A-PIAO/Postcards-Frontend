// import { StatusBar } from 'expo-status-bar';
import {Alert, Pressable, StyleSheet, Text, View,} from 'react-native';
// import React, { useState } from 'react';
// Import vector icons
import {AntDesign} from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { removeCredentials } from '../api/authSlice';

export default function AccountInfo({navigation}) {
  const dispatch = useDispatch()
  const handleLogOut = () => {
    dispatch(removeCredentials());
  }
  return (
    <>
      <View style={styles.container}>
        {/* <Pressable style={styles.button} onPress={() => navigation.navigate('Home')}> */}
        <Pressable style={styles.button} onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={23} color="grey"/>
        </Pressable>

        <View style={{
          height: '30%', justifyContent: 'center', alignItems: 'left',
          textAlignVertical: 'bottom', marginTop: '16%'
        }}>
          <Text style={{fontWeight: 'bold', color: 'black', fontSize: 30, textAlignVertical: 'bottom',}}>Account
            Info</Text>
        </View>

        <Pressable style={{marginTop: '22%',}}
                   onPress={() => Alert.alert("Please contact KnowQuest@gmail.com for help")}>
          <Text style={{color: '#404040', fontSize: 15,}}>
            Need Help?
          </Text>
        </Pressable>
      </View>

      {/* reward points */}
      <Pressable style={styles.box} onPress={() => navigation.navigate('RewardHome', {myGoal: false})}>
        <Text style={styles.text}>Reward Points</Text>
        <View style={{backgroundColor: '#FFFFFF', width: '42%',}}></View>
        <AntDesign name="right" size={23} marginTop={35} color="grey"/>
      </Pressable>

      {/* gap */}
      <View style={{
        backgroundColor: '#FFFFFF',
        height: '50%',
        width: '100%',
      }}>
      </View>

      {/* log out */}
      <View style={{flexDirection: 'row', flex: 1,}}>
        <View style={{backgroundColor: '#FFFFFF', height: '100%', width: '40%',}}></View>
        <View style={{backgroundColor: '#FFFFFF', height: '100%', width: '20%',}}>
          <Text style={{marginTop: '4%', color: '#333399', fontSize: 16,}}
                onPress={handleLogOut}>
            Log Out
          </Text>
        </View>
        <View style={{backgroundColor: '#FFFFFF', height: '100%', width: '40%',}}></View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    height: '20%',
    paddingBottom: 0,
    elevation: 2,
    flexDirection: 'row',
    paddingHorizontal: '5%'
  },
  button: {
    borderRadius: 10,
    alignItems: 'left',
    justifyContent: 'center',
    height: 40,
    width: 30,
    marginTop: '18%',

  },
  box: {
    backgroundColor: '#FFFFFF',
    marginRight: '10%',
    justifyContent: 'left',
    borderBottomColor: '#C0C0C0',
    borderBottomWidth: 1,
    height: '12%',
    width: '100%',
    flexDirection: 'row',
  },
  text: {
    marginTop: '8%',
    marginLeft: '10%',
    color: '#404040',
    fontSize: 20,
    textAlignVertical: 'bottom',
  },
});