// import package and file needed
import {useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View,} from 'react-native';
import RewardGoal from '../components/RewardGoal';
import RewardRedeem from '../components/RewardRedeem';
import * as constant from '../constants';

// Import vector icons
import Icon from 'react-native-vector-icons/FontAwesome';
import {AntDesign} from '@expo/vector-icons';

// reward category section
const RewardCate = ({icon, name, background}) => (
  <View style={{
    width: 80, height: '160%', backgroundColor: background, borderRadius: 10, alignItems: 'center', shadowColor: '#000',
    shadowOpacity: 0.2, shadowRadius: 2.22, shadowOffset: {width: 0, height: 1,}, marginHorizontal: 10
  }}>
    <View style={{height: '10%'}}/>
    <Icon name={icon} size={'50'} color="#404040"/>
    <View style={{height: '10%'}}/>
    <Text style={{
      fontSize: 13, fontWeight: 'bold', color: constant.PRIMARY_COLOR,
      justifyContent: 'center', alignItems: 'center'
    }}>
      {name}
    </Text>
  </View>

)

// TODO: This page is hard code right now, need to connect to backend when backend finised reward related part
export default function RewardHome({route, navigation}) {
  // display redeem reward when click my goal
  const [showRedeem, setShowRedeem] = useState(!route.params['myGoal']);

  // redeem / my goal button set up and appereance
  const [goalClick, setGoalClick] = useState(route.params['myGoal'])
  const [allClick, setAllClick] = useState(!route.params['myGoal'])

  const borderBotWidM = goalClick ? 2 : 0;
  const colorM = goalClick ? constant.PRIMARY_COLOR : '#000000';
  const weightM = goalClick ? 'bold' : 'normal';

  const borderBotWidA = allClick ? 2 : 0;
  const colorA = allClick ? constant.PRIMARY_COLOR : '#000000';
  const weightA = allClick ? 'bold' : 'normal';

  return (
    <>
      {/* Header */}
      <View style={styles.container}>
        <Pressable style={styles.button} onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={23} color="grey"/>
        </Pressable>

        <View style={{
          height: 40, justifyContent: 'center', alignItems: 'center',
          textAlignVertical: 'bottom', marginTop: 50,
        }}>
          <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold', color: constant.PRIMARY_COLOR, fontSize: 28,}}>3580</Text>
            <Text style={{color: constant.PRIMARY_COLOR, fontSize: 14,}}>Avaliable Points</Text>
          </View>
        </View>

        <Pressable style={styles.button} onPress={() => navigation.navigate('SearchPage')}>
          <Icon name="search" size={23} color="grey"/>
        </Pressable>
      </View>

      {/* redeem/my goal button */}
      <View style={styles.textCategory}>
        <View style={{flexDirection: "row"}}>
          <Pressable testID='allButton' onPress={() => {
            setAllClick(true), setGoalClick(false), setShowRedeem(true)
          }}
                     style={{
                       marginLeft: 10, marginRight: 10,
                       borderBottomColor: '#80279B', borderBottomWidth: borderBotWidA,
                     }}>
            <Text style={{
              fontSize: 15,
              fontWeight: weightA,
              color: colorA,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              Redeem
            </Text>
          </Pressable>
          <Pressable testID='myGoalsButton' onPress={() => {
            setGoalClick(true), setAllClick(false), setShowRedeem(false)
          }}
                     style={{
                       marginLeft: 10, marginRight: 10,
                       borderBottomColor: '#80279B', borderBottomWidth: borderBotWidM,
                     }}>
            <Text style={{
              fontSize: 15,
              fontWeight: weightM,
              color: colorM,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              My Goals
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Reward Category Horizontal Scroll*/}
      <View style={{
        height: '13%',
        backgroundColor: '#FFFFFF',
        paddingVertical: '1%',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom: 40, paddingTop: 5, height: '98%'}}>

          <RewardCate icon={'coffee'} background={'#EFE8FA'} name={'Food'}></RewardCate>
          <RewardCate icon={'ship'} background={'#FFFFFF'} name={'Trips'}></RewardCate>
          <RewardCate icon={'plane'} background={'#FFFFFF'} name={'Flight'}></RewardCate>
          <RewardCate icon={'camera-retro'} background={'#FFFFFF'} name={'Movie'}></RewardCate>
          <RewardCate icon={'book'} background={'#FFFFFF'} name={'Books'}></RewardCate>
          <RewardCate icon={'mobile-phone'} background={'#FFFFFF'} name={'Gadgets'}></RewardCate>

        </ScrollView>
      </View>
      {/* sort drop down box */}
      {/* TODO: need to connect to backend when backend reward done implement */}
      <View style={{height: '4%', backgroundColor: '#FFFFFF', paddingHorizontal: 10}}>
        <View style={{
          marginLeft: '2%', width: '18%', height: "62%", backgroundColor: '#FFFFFF', borderRadius: 10,
          shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 2.22, flexDirection: "row",
          shadowOffset: {width: 0, height: 1,}, elevation: 3,
        }}>

          <Text style={{
            fontSize: 15, color: '#404040', marginLeft: '12%', marginTop: "5%",
            justifyContent: 'center', alignItems: 'center'
          }}>
            Sort
          </Text>
          <Icon name="sort-down" size={20} color="#404040" marginLeft="15%" marginTop="-2%"/>
        </View>
      </View>

      {/* Reward Card Scroll*/}
      {/* display context base on which button (redeem/my goal) clicked*/}
      {showRedeem ? (<RewardRedeem navigation={navigation}/>) : (<RewardGoal/>)}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    height: '13%',
    paddingBottom: 0,
    elevation: 2,
    flexDirection: 'row',
    paddingHorizontal: '5%',
  },
  textCategory: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    height: '5%',
    borderBottomColor: '#C0C0C0',
    borderBottomWidth: 2,
  },
  button: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 30,
    marginTop: 50,
  },
});
