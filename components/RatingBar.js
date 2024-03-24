import {useState} from "react";
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

const CustomRatingBar = ({changeMovieRating, ques}) => {

  const [rating, setRating] = useState(0)
  const [maxRating, setmaxRating] = useState([1, 2, 3, 4, 5])

  const starImgEmpty = require('../assets/StarSVGEmpty.png');
  const starImgFilled = require('../assets/StarSVGFilled.png');

  return (
    <View style={styles.CustomRatingBarStyle}>
      {
        maxRating.map((item, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => {
                setRating(item)
                changeMovieRating(ques._id, item)
              }
              }
            >
              <Image
                style={styles.starImgStyle}
                source={
                  item <= rating
                    ? starImgFilled
                    : starImgEmpty
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
  }
});

export default CustomRatingBar;