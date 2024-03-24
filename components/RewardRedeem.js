// import Packages
import {ImageBackground, Pressable, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import * as constant from '../constants';

// Import vector icons
import {AntDesign} from '@expo/vector-icons';

// Rewards images
const pizzaImage = require("../assets/domino's_pizza.png");
const starbucksImage = require("../assets/starbucks.png");
const gongChaImage = require("../assets/Gong-Cha.png");

// single redeem reward block
const RedeemBlock = ({percentOff, background, rewardName, pts, free, navigation}) => {
  // check if the reward is free
  let text = '';
  if (free) {
    text = 'Free';
  } else {
    text = String(percentOff) + ' %';
  }

  return (
    <View style={{
      flexDirection: "row",
      paddingHorizontal: '3%',
      paddingTop: '3%',
      height: 250,
      borderRadius: 10,
      width: '100%',
    }}>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('PizzaReward', {
        image: background,
        name: rewardName,
        pts: pts,
        percentOff: percentOff,
        free: free
      })}>
        <View style={{borderRadius: 10, width: '100%',}}>
          <ImageBackground source={background} style={styles.rewardImg} imageStyle={{borderRadius: 10}}>
            <View style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.3)',
              borderRadius: 10,
              justifyContent: 'space-between',
              paddingVertical: '5%',
              paddingHorizontal: '5%'
            }}>
              {/* Reward details */}
              {/* right arrow*/}
              <Pressable style={{
                marginLeft: '85%', width: '10%', height: "13%",
                backgroundColor: 'white', borderRadius: 18, opacity: 0.7
              }}
                         onPress={() => navigation.navigate('PizzaReward', {
                           image: background,
                           name: rewardName,
                           pts: pts,
                           percentOff: percentOff,
                           free: free
                         })}>
                <AntDesign name="right" size={23} color="grey" marginLeft='25%' marginTop='8%'/>
              </Pressable>

              <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end',}}>
                <View>
                  <Text style={{color: '#FFFFFF', fontSize: 17,}}>
                    {text}
                  </Text>

                  <Text numberOfLines={1}
                        style={{color: '#FFFFFF', fontSize: 20, marginTop: '1%', fontWeight: 'bold',}}>
                    {rewardName}
                  </Text>

                  <Text style={{color: '#FFFFFF', fontSize: 17, marginTop: '1%',}}>
                    {pts} pts
                  </Text>
                </View>

                {/* redeem button*/}
                <Pressable style={{
                  width: '25%',
                  height: "40%",
                  backgroundColor: constant.SECONDARY_COLOR,
                  borderRadius: 18,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                           onPress={() => navigation.navigate('PizzaReward',
                             {image: background, name: rewardName, pts: pts, percentOff: percentOff, free: free})}>
                  <Text style={{fontSize: 14, color: '#FFFFCC',}}
                        onPress={() => navigation.navigate('PizzaReward', {
                          image: background,
                          name: rewardName,
                          pts: pts,
                          percentOff: percentOff,
                          free: free
                        })}>
                    Redeem
                  </Text>
                </Pressable>

              </View>

            </View>

          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

// TODO: This page is hard code right now, need to connect to backend when backend finised reward related part
export default function RewardRedeem({navigation}) {
  return (
    <ScrollView contentContainerStyle={{paddingBottom: 40,}}>

      <RedeemBlock background={pizzaImage} pts={250} percentOff={15} rewardName={'Domino\'s Pizza'} free={false}
                   navigation={navigation}></RedeemBlock>
      <RedeemBlock background={starbucksImage} pts={150} percentOff={15} rewardName={'Starbucks Frappuccino'}
                   free={true} navigation={navigation}></RedeemBlock>
      <RedeemBlock background={gongChaImage} pts={150} percentOff={15} rewardName={'Gong Cha'} free={true}
                   navigation={navigation}></RedeemBlock>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  rewardImg: {
    width: '100%',
    height: '100%',
    borderRadius: 18,
    position: 'absolute',
  },
});
