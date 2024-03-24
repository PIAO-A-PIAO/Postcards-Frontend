import React from "react";
import { TouchableWithoutFeedback, View, ImageBackground, Text, StyleSheet } from "react-native";

const RecommendMovie = ({ i, movies, navigation }) => {
  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate("ProductRating", { id: movies[i]?.id })
      }
    >
      <View style={{ borderRadius: 10, width: "32%", marginRight: 6 }}>
        {/* get corresponding image from tmdb */}
        <ImageBackground
          source={{
            uri: `https://image.tmdb.org/t/p/original/${movies[i]?.backdrop_path}`,
          }}
          style={styles.rateImg}
          imageStyle={{ borderRadius: 10 }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.3)",
              borderRadius: 10,
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                color: "#FFFFFF",
                fontSize: 17,
                marginTop: 140,
                marginHorizontal: 8,
                fontWeight: "bold",
              }}
            >
              {" "}
              {movies[i]?.title}{" "}
            </Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RecommendMovie;

const styles = StyleSheet.create({
  rateImg: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
})
