// import packages
import { StatusBar } from "expo-status-bar";
import {
  Alert,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { RecommendMovie, CameraComponent } from "../components";
import * as constant from "../constants.js";
import axios from "axios";
import { useGetMoviesQuery } from "../api/apiAuthSlice.js";

// image path
const profilePic = require("../assets/ppic.png");
const logo = require("../assets/kqhome.png");
const PlaneImage = require("../assets/home_airplane.png");

const awesome = require("../assets/mood/VeryGood.png");
const good = require("../assets/mood/Good.png");
const fine = require("../assets/mood/Neutral.png");
const terrible = require("../assets/mood/VeryBad.png");
const bad = require("../assets/mood/Bad.png");

// Bar plot component
const RatingBar = ({ color, step, top }) => {
  return (
    <View
      style={{
        backgroundColor: color,
        height: 10,
        width: (8.4 * step + step).toString() + "%",
        position: "absolute",
        borderRadius: 5,
        marginTop: top,
      }}
    />
  );
};

// Bar plot component
const BarPlotSideName = ({}) => {
  return (
    <View
      style={{
        backgroundColor: "#FFFFFF",
        height: 200,
        flexDirection: "row",
        width: "14%",
        // flexDirection: 'column'
      }}
    >
      <Text style={styles.yourRatingText}>Movie</Text>
      <Text style={styles.yourRatingText}>TV</Text>
      <Text style={styles.yourRatingText}>Coffee</Text>
      <Text style={styles.yourRatingText}>Wine</Text>
      <Text style={styles.yourRatingText}>Textbook</Text>
    </View>
  );
};

// Bar plot component
const BarPlotBottomNumber = ({}) => {
  return (
    <View
      style={{
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        height: "15%",
        width: "100%",
        paddingLeft: 4,
        paddingTop: 5,
      }}
    >
      <Text style={styles.chartBackgroundNumber}> 0 </Text>
      <Text style={styles.chartBackgroundNumber}> 1 </Text>
      <Text style={styles.chartBackgroundNumber}> 2 </Text>
      <Text style={styles.chartBackgroundNumber}> 3 </Text>
      <Text style={styles.chartBackgroundNumber}> 4 </Text>
      <Text style={styles.chartBackgroundNumber}> 5 </Text>
      <Text style={styles.chartBackgroundNumber}> 6 </Text>
      <Text style={styles.chartBackgroundNumber}> 7 </Text>
      <Text style={styles.chartBackgroundNumber}> 8 </Text>
      <Text style={styles.chartBackgroundNumber}> 9 </Text>
      <Text style={styles.chartBackgroundNumber}> 10 </Text>
    </View>
  );
};

// Bar plot component
const BarPlotBackgroundLine = ({}) => {
  return (
    <>
      <View style={styles.chartBackgroundLine}></View>
      <View style={styles.chartBackgroundLine}></View>
      <View style={styles.chartBackgroundLine}></View>
      <View style={styles.chartBackgroundLine}></View>
      <View style={styles.chartBackgroundLine}></View>
      <View style={styles.chartBackgroundLine}></View>
      <View style={styles.chartBackgroundLine}></View>
      <View style={styles.chartBackgroundLine}></View>
      <View style={styles.chartBackgroundLine}></View>
      <View style={styles.chartBackgroundLine}></View>
      <View style={styles.chartBackgroundLine}></View>
    </>
  );
};

// Rating bar used for reward
const Progress = ({ step, steps, height }) => {
  // get percentage of current progress, used to define the width the progress bar
  const per = Math.round((step / steps) * 100);
  const per_s = per + "%";

  return (
    <>
      <Text
        style={{
          marginLeft: "60%",
          marginRight: "4%",
          color: "#FFFFFF",
          fontWeight: "500",
          fontSize: 12,
          marginTop: "14%",
        }}
      >
        {steps - step} pts to win
      </Text>
      <View
        style={{
          backgroundColor: constant.LIGHT_GREY,
          height,
          borderRadius: height,
          marginLeft: "4%",
          marginRight: "4%",
        }}
      >
        <View
          style={{
            height,
            width: per_s,
            backgroundColor: constant.SECONDARY_COLOR,
            borderRadius: height,
            position: "absolute",
            left: 0,
            top: 0,
          }}
        />
      </View>
      <Text
        style={{
          marginLeft: "4%",
          marginRight: "4%",
          color: "#FFFFFF",
          fontWeight: "500",
          fontSize: 12,
          marginTop: "1%",
        }}
      >
        {step} / {steps}
      </Text>
    </>
  );
};

export default function Home({ navigation }) {
  // TMDB URL and API key
  const server_url = process.env.EXPO_PUBLIC_API_URI;
  const apiKey = process.env.REACT_APP_TMDB_API_KEY;
  const currPage = 1;
  const [movies, setMovies] = useState([]);
  const moviesRes = useGetMoviesQuery(currPage)

  const [movieUrl, setMovieUrl] = useState("");

  useEffect(() => {
    if (moviesRes?.currentData) {
      setMovies(moviesRes.currentData.results);
    }
  }, [moviesRes])
  // bar plot set up
  const [clickW, setclickW] = useState(true);
  const [clickM, setclickM] = useState(false);
  const [clickSixM, setclicksixM] = useState(false);

  const backgroundW = clickW ? "#FFFFFF" : "#EDEDED";
  const backgroundM = clickM ? "#FFFFFF" : "#EDEDED";
  const backgroundSixM = clickSixM ? "#FFFFFF" : "#EDEDED";

  // emoji section set up
  const [showAwesome, setAwesome] = useState(false);
  const [showGood, setGood] = useState(false);
  const [showFine, setFine] = useState(false);
  const [showBad, setBad] = useState(false);
  const [showTerrible, setTerrible] = useState(false);

  // Bar code scan
  const handleBarCodeScanned = ({ type, data }) => {
    Alert.alert(
      "Barcode Scanned",
      `Type: ${type}\nData: ${data}`,
      [
        {
          text: "Cancel",
          onPress: () => setIsCameraOpen(false),
          style: "cancel",
        },
        {
          text: "Go",
          onPress: () => {
            // Navigate to the movie rating page
            setIsCameraOpen(false); // Close the camera
            navigation.navigate("ProductRating");
          },
        },
      ],
      { cancelable: false }
    );
  };
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const openCamera = () => {
    setIsCameraOpen(true);
  };

  return (
    <>
      {isCameraOpen ? (
        <View style={styles.cameraContainer}>
          <CameraComponent onBarCodeScanned={handleBarCodeScanned} />
        </View>
      ) : (
        <ScrollView
          style={{ backgroundColor: "#FBFBFF" }}
          contentContainerStyle={{ flexGrow: 2 }}
        >
          {/* header */}
          <View style={styles.header}>
            <Pressable
              style={{
                height: 40,
                backgroundColor: "#f4f4f4",
                width: 40,
                borderRadius: 50,
                alignItems: "center",
                flexDirection: "row",
                paddingLeft: 10,
              }}
              onPress={() => navigation.navigate("SearchPage")}
            >
              <FontAwesome name="search" size={20} color="#333399" style={{}} />
            </Pressable>

            {/* logo */}
            <View
              style={{
                height: 40,
                width: 40,
                borderColor: "transparent",
                borderWidth: 1,
                borderRadius: 50,
              }}
            >
              <Image
                source={logo}
                style={{ width: "100%", height: "100%", aspectRatio: 1 }}
              />
            </View>

            {/* profile pic */}
            <View
              style={{
                height: 40,
                width: 40,
                borderColor: "transparent",
                borderWidth: 1,
                borderRadius: 50,
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("AccountInfo")}
              >
                <Image
                  source={profilePic}
                  style={{ width: "100%", height: "100%", aspectRatio: 1 }}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Reward section*/}
          <View style={styles.container1}>
            {/* earned points */}
            <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate("RewardHome", { myGoal: false })
              }
            >
              <View style={styles.earn}>
                <Text style={{ color: "grey", fontSize: 15 }}> You earned</Text>
                <Text
                  style={{
                    fontWeight: "bold",
                    color: constant.PRIMARY_COLOR,
                    fontSize: 35,
                    marginVertical: 5,
                  }}
                >
                  {" "}
                  3850
                </Text>
                <Text style={{ color: "grey", fontSize: 15 }}>
                  {" "}
                  reward points
                </Text>
              </View>
            </TouchableWithoutFeedback>

            {/* reward goal */}
            <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate("RewardHome", { myGoal: true })
              }
            >
              <View
                style={{
                  borderRadius: 10,
                  width: "65%",
                  backgroundColor: "black",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.8,
                  shadowRadius: 1,
                  flex: 1,
                }}
                onPress={() => navigation.navigate("RewardHome")}
              >
                <ImageBackground
                  source={PlaneImage}
                  style={styles.plane}
                  imageStyle={{ borderRadius: 10 }}
                >
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontSize: 15,
                      marginTop: "4%",
                      marginLeft: "4%",
                    }}
                  >
                    {" "}
                    30% off
                  </Text>
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontSize: 23,
                      marginLeft: "4%",
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    Flight to Vancouver
                  </Text>

                  {/* statusbar*/}
                  <StatusBar hidden />
                  <Progress step={1750} steps={5000} height={13} />
                </ImageBackground>
              </View>
            </TouchableWithoutFeedback>
          </View>

          {/* Your Rating/bar plot sectiob */}
          <View style={styles.yourRating}>
            <View
              style={{
                backgroundColor: "#FFFFFF",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  color: constant.PRIMARY_COLOR,
                  fontSize: 23,
                }}
              >
                Your Ratings
              </Text>

              {/* w/m/6m button */}
              <View
                style={{
                  width: 200,
                  backgroundColor: "#EDEDED",
                  padding: 2,
                  height: 20,
                  borderRadius: 15,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Pressable
                  style={{
                    backgroundColor: backgroundW,
                    borderRadius: 15,
                    width: "33%",
                  }}
                  onPress={() => {
                    setclickW(true), setclickM(false), setclicksixM(false);
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#2D2D2D",
                      fontSize: 14,
                    }}
                  >
                    W
                  </Text>
                </Pressable>
                <Pressable
                  style={{
                    backgroundColor: backgroundM,
                    borderRadius: 15,
                    width: "33%",
                  }}
                  onPress={() => {
                    setclickW(false), setclickM(true), setclicksixM(false);
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#2D2D2D",
                      fontSize: 14,
                    }}
                  >
                    M
                  </Text>
                </Pressable>
                <Pressable
                  style={{
                    backgroundColor: backgroundSixM,
                    borderRadius: 15,
                    width: "33%",
                  }}
                  onPress={() => {
                    setclickW(false), setclickM(false), setclicksixM(true);
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#2D2D2D",
                      fontSize: 14,
                    }}
                  >
                    6M
                  </Text>
                </Pressable>
              </View>
            </View>

            {/* bar plots */}
            {/* TODO: hard code for now, when backend have rating data, need to connect to backend server */}
            {
              //plot for week
              clickW && (
                <>
                  <View style={{ backgroundColor: "#FFFFFF" }}>
                    <Text
                      style={{
                        color: "gray",
                        fontSize: 15,
                        marginBottom: 10,
                        fontWeight: "bold",
                      }}
                    >
                      May 28 - Jun 3, 2023
                    </Text>
                  </View>

                  <View
                    style={{
                      backgroundColor: "#FFFFFF",
                      height: 200,
                      flexDirection: "row",
                    }}
                  >
                    <BarPlotSideName />

                    <View
                      style={{
                        backgroundColor: "#FFFFFF",
                        height: 200,
                        width: "85%",
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: "#FFFFFF",
                          borderBottomColor: "#DBDBDB",
                          borderBottomWidth: 1,
                          flexDirection: "row",
                          height: "85%",
                          width: "95%",
                          marginLeft: 10,
                        }}
                      >
                        <BarPlotBackgroundLine />
                        <RatingBar
                          color={constant.SECONDARY_COLOR}
                          step={8}
                          steps={10}
                          top={3}
                        />
                        <RatingBar
                          color={constant.PRIMARY_COLOR}
                          step={7}
                          steps={10}
                          top={37}
                        />
                        <RatingBar
                          color={constant.PRIMARY_COLOR}
                          step={5}
                          steps={10}
                          top={71}
                        />
                        <RatingBar
                          color={constant.PRIMARY_COLOR}
                          step={3}
                          steps={10}
                          top={105}
                        />
                        <RatingBar
                          color={constant.PRIMARY_COLOR}
                          step={1}
                          steps={10}
                          top={139}
                        />
                      </View>

                      <BarPlotBottomNumber />
                    </View>
                  </View>
                </>
              )
            }
            {
              // plot for month
              clickM && (
                <>
                  <View style={{ backgroundColor: "#FFFFFF" }}>
                    <Text
                      style={{
                        color: "gray",
                        fontSize: 15,
                        marginBottom: 10,
                        fontWeight: "bold",
                      }}
                    >
                      May 3 - Jun 3, 2023
                    </Text>
                  </View>

                  <View
                    style={{
                      backgroundColor: "#FFFFFF",
                      height: 200,
                      flexDirection: "row",
                    }}
                  >
                    <BarPlotSideName />

                    <View
                      style={{
                        backgroundColor: "#FFFFFF",
                        height: 200,
                        width: "85%",
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: "#FFFFFF",
                          borderBottomColor: "#DBDBDB",
                          borderBottomWidth: 1,
                          flexDirection: "row",
                          height: "85%",
                          width: "97%",
                          marginLeft: 10,
                        }}
                      >
                        <BarPlotBackgroundLine />
                        <RatingBar
                          color={constant.SECONDARY_COLOR}
                          step={9}
                          steps={10}
                          top={3}
                        />
                        <RatingBar
                          color={constant.PRIMARY_COLOR}
                          step={8}
                          steps={10}
                          top={37}
                        />
                        <RatingBar
                          color={constant.PRIMARY_COLOR}
                          step={8}
                          steps={10}
                          top={71}
                        />
                        <RatingBar
                          color={constant.PRIMARY_COLOR}
                          step={6}
                          steps={10}
                          top={105}
                        />
                        <RatingBar
                          color={constant.PRIMARY_COLOR}
                          step={3}
                          steps={10}
                          top={139}
                        />
                      </View>

                      <BarPlotBottomNumber />
                    </View>
                  </View>
                </>
              )
            }
            {
              // plot for six month
              clickSixM && (
                <>
                  <View style={{ backgroundColor: "#FFFFFF" }}>
                    <Text
                      style={{
                        color: "gray",
                        fontSize: 15,
                        marginBottom: 10,
                        fontWeight: "bold",
                      }}
                    >
                      Jan 3 - Jun 3, 2023
                    </Text>
                  </View>

                  <View
                    style={{
                      backgroundColor: "#FFFFFF",
                      height: 200,
                      flexDirection: "row",
                    }}
                  >
                    <BarPlotSideName />

                    <View
                      style={{
                        backgroundColor: "#FFFFFF",
                        height: 200,
                        width: "85%",
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: "#FFFFFF",
                          borderBottomColor: "#DBDBDB",
                          borderBottomWidth: 1,
                          flexDirection: "row",
                          height: "85%",
                          width: "97%",
                          marginLeft: 10,
                        }}
                      >
                        <BarPlotBackgroundLine />
                        <RatingBar
                          color={constant.SECONDARY_COLOR}
                          step={10}
                          steps={10}
                          top={3}
                        />
                        <RatingBar
                          color={constant.PRIMARY_COLOR}
                          step={7.5}
                          steps={10}
                          top={37}
                        />
                        <RatingBar
                          color={constant.PRIMARY_COLOR}
                          step={5.25}
                          steps={10}
                          top={71}
                        />
                        <RatingBar
                          color={constant.PRIMARY_COLOR}
                          step={5}
                          steps={10}
                          top={105}
                        />
                        <RatingBar
                          color={constant.PRIMARY_COLOR}
                          step={3}
                          steps={10}
                          top={139}
                        />
                      </View>

                      <View
                        style={{
                          backgroundColor: "#FFFFFF",
                          flexDirection: "row",
                          height: "15%",
                          width: "100%",
                          paddingLeft: 4,
                          paddingTop: 5,
                        }}
                      >
                        <Text style={styles.chartBackgroundNumber}> 0 </Text>
                        <Text style={styles.chartBackgroundNumber}> 4 </Text>
                        <Text style={styles.chartBackgroundNumber}> 8 </Text>
                        <Text style={styles.chartBackgroundNumber}> 12 </Text>
                        <Text style={styles.chartBackgroundNumber}> 16 </Text>
                        <Text style={styles.chartBackgroundNumber}> 20 </Text>
                        <Text style={styles.chartBackgroundNumber}> 24 </Text>
                        <Text style={styles.chartBackgroundNumber}> 28 </Text>
                        <Text style={styles.chartBackgroundNumber}> 32 </Text>
                        <Text style={styles.chartBackgroundNumber}> 36 </Text>
                      </View>
                    </View>
                  </View>
                </>
              )
            }
          </View>

          {/* How you are feeling section */}
          {/* TODO: hard code for now, when backend have feeling data, need to connect to backend server */}
          <View style={styles.feeling}>
            <View style={{ backgroundColor: "#FFFFFF" }}>
              <Text
                style={{
                  fontWeight: "bold",
                  color: "#000000",
                  marginLeft: 5,
                  fontSize: 21,
                }}
              >
                How are you feeling today?
              </Text>
            </View>

            <View style={styles.emojiBox}>
              {/* Awsome */}
              <View
                style={styles.emojiHolder}
                onStartShouldSetResponder={() => {
                  Alert.alert("Got it!", "You are feeling awesome today");
                  setAwesome(true);
                  setGood(false);
                  setFine(false);
                  setBad(false);
                  setTerrible(false);
                }}
              >
                <ImageBackground source={awesome} style={styles.mood}>
                  {showAwesome && (
                    <Image
                      source={awesome}
                      style={{ tintColor: "#FAC30D", opacity: 0.7 }}
                    ></Image>
                  )}
                </ImageBackground>
                <Text>Awesome</Text>
              </View>
              {/* Good */}
              <View
                style={styles.emojiHolder}
                onStartShouldSetResponder={() => {
                  Alert.alert("Got it!", "You are feeling good today");
                  setAwesome(false);
                  setGood(true);
                  setFine(false);
                  setBad(false);
                  setTerrible(false);
                }}
              >
                <ImageBackground source={good} style={styles.mood}>
                  {showGood && (
                    <Image
                      source={good}
                      style={{ tintColor: "#FAC30D", opacity: 0.7 }}
                    ></Image>
                  )}
                </ImageBackground>
                <Text>Good</Text>
              </View>
              {/* Fine */}
              <View
                style={styles.emojiHolder}
                onStartShouldSetResponder={() => {
                  Alert.alert("Got it!", "You are feeling fine today");
                  setAwesome(false);
                  setGood(false);
                  setFine(true);
                  setBad(false);
                  setTerrible(false);
                }}
              >
                <ImageBackground source={fine} style={styles.mood}>
                  {showFine && (
                    <Image
                      source={fine}
                      style={{ tintColor: "#FAC30D", opacity: 0.7 }}
                    ></Image>
                  )}
                </ImageBackground>
                <Text>Fine</Text>
              </View>
              {/* Bad */}
              <View
                style={styles.emojiHolder}
                onStartShouldSetResponder={() => {
                  Alert.alert(
                    "Got it!",
                    "Sorry to hear you are feeling bad today"
                  );
                  setAwesome(false);
                  setGood(false);
                  setFine(false);
                  setBad(true);
                  setTerrible(false);
                }}
              >
                <ImageBackground source={bad} style={styles.mood}>
                  {showBad && (
                    <Image
                      source={bad}
                      style={{ tintColor: "#FAC30D", opacity: 0.7 }}
                    ></Image>
                  )}
                </ImageBackground>
                <Text>Bad</Text>
              </View>
              {/* Terrible */}
              <View
                style={styles.emojiHolder}
                onStartShouldSetResponder={() => {
                  Alert.alert(
                    "Got it!",
                    "Sorry to hear you are feeling terrible today"
                  );
                  setAwesome(false);
                  setGood(false);
                  setFine(false);
                  setBad(false);
                  setTerrible(true);
                }}
              >
                <ImageBackground source={terrible} style={styles.mood}>
                  {showTerrible && (
                    <Image
                      source={terrible}
                      style={{ tintColor: "#FAC30D", opacity: 0.7 }}
                    ></Image>
                  )}
                </ImageBackground>
                <Text>Terrible</Text>
              </View>
            </View>
          </View>

          {/* Rate your experience section */}
          <View style={styles.rate}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: "2%",
              }}
            >
              <Text
                style={{ fontWeight: "bold", color: "#262626", fontSize: 21 }}
              >
                Rate your experience
              </Text>
              <Pressable
                onPress={() => navigation.navigate("CategoryOverview")}
              >
                <Text
                  style={{
                    color: "#6665AE",
                    fontSize: 16,
                    textDecorationLine: "underline",
                  }}
                >
                  View All
                </Text>
              </Pressable>
            </View>

            {/*  Top three now playing movie */}
            <View
              style={{
                flexDirection: "row",
                height: 200,
                marginTop: "3%",
                marginBottom: 50,
              }}
            >
              <RecommendMovie
                i={0}
                movies={movies}
                navigation={navigation}
              ></RecommendMovie>
              <RecommendMovie
                i={1}
                movies={movies}
                navigation={navigation}
              ></RecommendMovie>
              <RecommendMovie
                i={2}
                movies={movies}
                navigation={navigation}
              ></RecommendMovie>
            </View>
          </View>
          <StatusBar style="auto" />
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
    height: "9.5%",
    alignItems: "flex-end",
    flexDirection: "row",
    paddingBottom: "2%",
    paddingHorizontal: "5%",
    marginBottom: "4%",
    justifyContent: "space-between",
  },
  container1: {
    height: "16%",
    flexDirection: "row",
    paddingBottom: "5%",
    paddingHorizontal: "2%",
  },
  earn: {
    borderRadius: 10,
    width: "33%",
    marginRight: 12,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    alignItems: "center",
    justifyContent: "center",
    // elevation: 5,
  },
  plane: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
  yourRating: {
    height: "25%",
    padding: "3%",
    shadowColor: "#000",
    backgroundColor: "#fff",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
  },
  yourRatingText: {
    color: "gray",
    fontSize: 13,
    marginBottom: 18,
    textAlign: "right",
  },
  chartBackgroundLine: {
    borderColor: "#DBDBDB",
    borderWidth: 0.5,
    marginRight: "9.1%",
  },
  chartBackgroundNumber: {
    marginRight: "4.3%",
    color: "gray",
  },
  feeling: {
    height: "18%",
    padding: "3%",
    marginVertical: "5%",
    marginHorizontal: "2%",
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  emojiHolder: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginLeft: "2%",
    width: "18%",
  },
  emojiBox: {
    backgroundColor: "#FFFFFF",
    height: 150,
    alignItems: "center",
    flexDirection: "row",
  },
  emoji: {
    marginBottom: "2%",
  },
  mood: {
    width: 50,
    height: 50,
    marginBottom: "2%",
  },
  cameraContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1, // Ensure the camera is displayed above other elements
  },
  rate: {
    paddingHorizontal: "2%",
    height: 350,
  },
});
