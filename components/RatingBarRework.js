import {useRef, useState} from "react";
import {Image, PanResponder, StyleSheet, TouchableOpacity, View} from 'react-native';

const CustomRatingBar = () => {

  const [rating, setRating] = useState(0)
  const [maxRating, setmaxRating] = useState([1, 2, 3, 4, 5])

  const starImgEmpty = require('../assets/StarSVGEmpty.png');
  const starImgFilled = require('../assets/StarSVGFilled.png');
  const starImgHalfFilled = require('../assets/StarSVGHalfFilled.png');

  const panResponder = useRef(
    PanResponder.create({
      //ask the responder to initialize
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => handleStarRating(evt.nativeEvent.locationX),
      onPanResponderMove: (evt) => handleStarRating(evt.nativeEvent.locationX),
    })
  ).current;

  const handleStarRating = (x) => {
    const starWidth = 50; //Width of star
    const totalWidth = starWidth + 10; //Width add margin
    let calculatedRating = Math.ceil(x / totalWidth);
    if (x % totalWidth > 25 && x % totalWidth <= 50) {
      calculatedRating -= 0.5;
    }
    setRating(calculatedRating);
  }

  return (
    <View {...panResponder.panHandlers} style={styles.CustomRatingBarStyle}>
      {
        maxRating.map((item) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => {
                if (rating === item) {  // Full star tapped
                  setRating(item - 0.5);
                } else if (rating === item - 0.5) {  // Half-filled star tapped
                  setRating(item - 1);
                } else {
                  setRating(item);
                }
              }}
            >
              <Image
                style={styles.starImgStyle}
                source={
                  item <= rating
                    ? starImgFilled
                    : (item - 0.5 === rating ? starImgHalfFilled : starImgEmpty)
                }
              />
            </TouchableOpacity>
          );
        })
      }
    </View>
  )
}

const styles = StyleSheet.create({
  CustomRatingBarStyle: {
    justifyContent: 'flex-start',
    paddingLeft: 20,
    paddingBottom: 15,
    flexDirection: 'row',
  },
  starImgStyle: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    marginRight: 10,
  },
});

export default CustomRatingBar;