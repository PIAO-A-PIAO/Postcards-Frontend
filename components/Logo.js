//A logo component that can be used to display the KnowQuest logo with the text "KnowQuest" underneath
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const Logo = () => {
  return (
    <View style={{alignItems: 'center'}}>
      <Image style={styles.image} source={require("../assets/kqhome.png")} testID="kq-image"/>
      <Text style={styles.logoText}>KnowQuest</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 90,
    height: 90,
    marginTop: 50,
  },
  logoText: {
    color: "#333399",
    fontSize: 20,
    fontFamily: 'System',
    marginTop: 10,
    fontWeight: 'bold',
  },
});

export default Logo;
