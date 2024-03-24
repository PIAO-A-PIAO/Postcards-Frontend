import {useState} from "react";
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

const ReviewBar = ({ratingNum}) => {
  const starNum = Math.floor(ratingNum / 2)
  const [rating, setRating] = useState(starNum)
  const [maxRating, setmaxRating] = useState([1, 2, 3, 4, 5])

  const starImgEmpty = require('../assets/StarSVGEmpty.png');
  const starImgFilled = require('../assets/purple-star.png');
  return (
    <View style={styles.ReviewBarStyle}>
      {
        maxRating.map((item, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              // onPress={()=>setRating(item)}
            >
              <Image
                style={styles.starImgStyle}
                source={
                  item <= rating
                    ? starImgFilled
                    : starImgEmpty
                }
                testID={
                  item <= rating
                    ? 'filled-star'
                    : 'empty-star'
                }
              />
            </TouchableOpacity>
          )
        })
      }
    </View>
  )
}

const styles = StyleSheet.create({
  ReviewBarStyle: {
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
  }, purpleStarStyle: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
    marginRight: 10,
  }
});

export default ReviewBar;