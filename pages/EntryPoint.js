//Initial page for the mobile app
import React from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import {LinearGradient} from 'expo-linear-gradient';
import Swiper from 'react-native-swiper/src';
import * as components from '../components/index.js';
import * as constant from '../constants';

const {ColoredButton, Logo} = components;
const screenWidth = Dimensions.get('window').width;
const swiperHeight = Dimensions.get('window').height * 0.3;

export default function EntryPoint({navigation}) {
  // modify the images array to add more images to the swiper
  const images = [
    require('../assets/production.jpg'),
    require('../assets/ratingFigure.jpg'),
    require('../assets/kqhome.png'),
  ];

  return (
    <View style={styles.container}>
      <LinearGradient colors={[constant.LIGHT_BLUE, 'white']} style={styles.background}/>
      <Logo/>

      <View style={styles.swiperContainer} testID='swiper-container'>
        <Swiper loop autoplay>
          {images.map((image, index) => (
            <View key={index} style={styles.imageContainer}>
              <Image
                source={image}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
          ))}
        </Swiper>
      </View>

      <View style={{flex: 1, alignItems: 'center', width: '100%', justifyContent: 'start'}}>
        <ColoredButton title="Create Account" onPress={() => navigation.navigate('Signup')} buttonColor={'#44299e'}/>
        <ColoredButton title="Login" onPress={() => navigation.navigate('Login')} buttonColor={'white'}/>
      </View>
      <StatusBar style="auto"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  swiperContainer: {
    marginTop: 20,
    flex: 1,
    width: screenWidth,
    height: swiperHeight,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'start',
  },
  image: {
    width: screenWidth,
    height: swiperHeight * 0.8,
    resizeMode: 'contain',
  },
});