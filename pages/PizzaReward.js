// import packages
import {useState} from 'react';
import {ImageBackground, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';

// Import vector icons
import Icon from 'react-native-vector-icons/FontAwesome';
import {AntDesign} from '@expo/vector-icons';

// TODO: This page is hard code right now, need to connect to backend when backend finised reward related part
export default function PizzaReward({route, navigation}) {
  // get all information need for current page
  const rewardName = route.params['name']
  const img = route.params['image']
  const pts = route.params['pts']
  const percentOff = route.params['percentOff']
  const free = route.params['free']

  let text = '';
  if (free) {
    text = 'Free';
  } else {
    text = String(percentOff) + ' %';
  }

  // Display Redemption code and instruction if button is pressed
  const [displayText, setDisplayText] = useState(false);
  const [buttonText, setButtonText] = useState('Use points and Redeem');

  const handleButtonPress = () => {
    // Toggle the text on the button
    if (buttonText === 'Use points and Redeem') {
      setButtonText('Copy and Use Code');
    } else {
      setButtonText('Copied!');
    }
    // Display new text after the button is pressed
    setDisplayText(true);
  };

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
            <Text style={{fontWeight: 'bold', color: '#333399', fontSize: 28,}}>3580</Text>
            <Text style={{color: '#333399', fontSize: 14,}}>Avaliable Points</Text>
          </View>
        </View>

        <Pressable style={styles.button} onPress={() => navigation.navigate('SearchPage')}>
          <Icon name="search" size={23} color="grey"/>
        </Pressable>
      </View>

      {/* Content / reward details*/}
      <ImageBackground source={img} style={{width: '100%', height: '30%',}}
                       imageStyle={{
                         borderBottomLeftRadius: 10,
                         borderBottomRightRadius: 10,
                         width: '100%',
                         height: '100%'
                       }}>

        <View style={{
          justifyContent: 'flex-end',
          height: '100%',
          width: '100%',
          paddingBottom: '5%',
          paddingHorizontal: '5%',
        }}>
          <Text style={{color: '#FFFFFF', fontSize: 17, marginBottom: '1%'}}>
            {text}
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{color: '#FFFFFF', fontSize: 20, fontWeight: 'bold',}}>
              {rewardName}
            </Text>
            <Text style={{color: '#FFFFFF', fontSize: 17, textAlign: 'right',}}>
              {pts} pts
            </Text>
          </View>
        </View>

      </ImageBackground>

      <ScrollView style={{backgroundColor: '#FFFFFF'}}>
        <View style={styles.textContainer}>
          <Text style={{marginVertical: "1%",}}>
            Enjoy 15% off on large sized Pizza. The offer applies to only these pizza - Pepperoni, BBQ Chicken, Veggie,
            Deluxe, and Canadian.{'\n'}
          </Text>

          {/* Display text after button press */}
          {displayText ? (
            <View style={{}}>
              <Text style={{fontWeight: 'bold', paddingBottom: 10}}>
                How to Redeem
              </Text>

              <Text>
                1. Tap “Copy Code and Redeem” to open or download the Domino’s app. {'\n'}
                2. Select a large sized pizza of your choice. {'\n'}
                3. Proceed through checkout; your discount will automatically be applied. {'\n'}
                OR{'\n'}
                For orders in-store; Show the code when placing the order.
              </Text>

              <Text style={{fontWeight: 'bold', paddingVertical: 10}}>
                Your code
              </Text>

              <View style={styles.textBox}>
                <Text style={{fontWeight: 'bold', padding: 5, fontSize: 20}}>
                  VM06QK49XZ
                </Text>
              </View>
            </View>
          ) : (<></>)}

          <Text style={{fontWeight: 'bold', paddingBottom: 10}}>
            {'\n'}Terms & Conditions
          </Text>
          <Text>
            Save and redeem on the KnowQuest by June 12,2023 at 11:59 pm ET to receive 15% off on your online order on
            Dominos.com or in-store at participating Domino’s locations. Show this Unique promo code when placing order
            or enter the code at checkout to get your discount.
          </Text>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <View>
          <View style={{flexDirection: 'row',}}>
            <Icon name="calendar" size={18} color="grey"/>
            <Text style={{color: 'grey', paddingLeft: 10, marginTop: "1%"}}>
              Redeem by Fri, June 12, 2023, 11:59pm ET
            </Text>
          </View>
        </View>
        <TouchableOpacity testID='redeemButton' style={styles.footerButton} onPress={handleButtonPress}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
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
  footer: {
    height: "13%",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  footerButton: {
    backgroundColor: '#44299e',
    borderRadius: 25,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderColor: '#44299e',
    overflow: 'hidden',
    padding: 15,
    marginTop: 5,
    margin: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    paddingHorizontal: 50,
  },
  textContainer: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    marginVertical: "10%",
    marginHorizontal: "5%"
  },
  button: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 30,
    marginTop: 50,
  },
  textBox: {
    width: "90%",
    height: 50,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'grey',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '5%'
  },
});