//import packages
import {Image, ImageBackground, ScrollView, Text, View,} from 'react-native';
import * as constant from '../constants';

// Images
const PlaneImage = require('../assets/home_airplane.png');
const airCanLogo = require('../assets/air_canada_logo.png');
const tripImage = require('../assets/Martha.png');
const tripLogo = require('../assets/trip_logo.png')

// goal block section
const GoalBlock = ({percentOff, background, rewardName, logo, step, steps}) => {
  // calculate progress percentage
  const per = Math.round(step / steps * 100)
  const per_s = per + '%'

  return (
    <View style={{height: 180, width: '100%', borderRadius: 18, justifyContent: 'space-between', marginBottom: 15}}>

      <ImageBackground source={background} style={{width: '100%', height: '100%', flex: 1,}}
                       imageStyle={{borderRadius: 18,}}>

        <View style={{height: '55%', borderRadius: 18, paddingTop: '5%', paddingLeft: '5%', flexDirection: 'row'}}>
          {/* company logo */}
          <Image source={logo} style={{height: 40, width: 50}}></Image>
          {/* goal detail */}
          <View style={{paddingLeft: '5%',}}>
            <Text style={{fontSize: 13, color: '#FFFFFF', marginBottom: '1%'}}>{percentOff}% Off</Text>
            <Text style={{fontSize: 23, fontWeight: 'bold', color: '#FFFFFF'}}>{rewardName}</Text>
          </View>
        </View>

        <View style={{
          height: '45%',
          backgroundColor: '#FFFFFF',
          borderRadius: 18,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          {/* progress percentage */}
          <View
            style={{width: '25%', height: '100%', borderRadius: 18, alignItems: 'center', justifyContent: 'center',}}>
            <Text style={{fontSize: 15, color: constant.DARK_GREY}}> Allocate </Text>
            <View style={{flexDirection: 'row', height: '50%', justifyContent: 'center', marginTop: '3%',}}>
              <View style={{
                justifyContent: 'center', width: '50%', backgroundColor: constant.LIGHT_BLUE,
                marginHorizontal: '2%', borderRadius: 10, alignItems: 'center'
              }}>
                <Text style={{fontSize: 23, fontWeight: 'bold', color: constant.PRIMARY_COLOR}}>{per}</Text>
              </View>
              <View style={{justifyContent: 'center'}}>
                <Text style={{fontSize: 23, fontWeight: 'bold', color: constant.DARK_GREY}}>%</Text>
              </View>
            </View>
          </View>

          <View style={{width: '1%', height: '75%', borderRightWidth: 1, borderColor: constant.DARK_GREY}}></View>

          {/* Progress bar */}
          <View style={{width: '74%', height: '100%', borderRadius: 18, justifyContent: 'center', paddingLeft: '5%'}}>
            <Text style={{fontSize: 13, color: constant.DARK_GREY, marginBottom: '1%'}}>{steps - step} points to
              win</Text>
            <View style={{backgroundColor: constant.LIGHT_GREY, width: '90%', height: '30%', borderRadius: 20,}}>
              <View
                style={{
                  height: '100%', width: per_s, backgroundColor: constant.SECONDARY_COLOR,
                  borderRadius: 20, position: 'absolute',
                  left: 0, top: 0,
                }}/>

            </View>
            <Text style={{fontSize: 13, color: constant.DARK_GREY, marginTop: '1%'}}>{step}/{steps} pts</Text>
          </View>

        </View>
      </ImageBackground>
    </View>
  )
}

// TODO: This page is hard code right now, need to connect to backend when backend finised reward related part
export default function RewardGoal({}) {


  return (
    <>
      {/* Reward Card Scroll*/}
      <ScrollView contentContainerStyle={{paddingBottom: 40, paddingHorizontal: 10, paddingTop: 15,}}>

        <GoalBlock step={1750} steps={5000} background={PlaneImage} logo={airCanLogo} percentOff={30}
                   rewardName={'Flight to Vancouver'}></GoalBlock>

        <GoalBlock step={2550} steps={4000} background={tripImage} logo={tripLogo} percentOff={20}
                   rewardName={'Trip to Martha\'s Vineyeard'}></GoalBlock>

      </ScrollView>
    </>
  );
}
