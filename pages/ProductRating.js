import {useEffect, useState} from "react";
import {Alert, Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import * as components from '../components/index.js';
import {Buffer} from 'buffer';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from "axios";
import {avgRatingsByQuestionId, getAvgRating, getRatingByQuestionId,} from "../util/EntertainmentUtil";
import {AntDesign, FontAwesome} from '@expo/vector-icons';

const {CameraComponent} = components;
const {RatingBar, ProductCard, ReviewBar, UserReviewBar} = components;

const logo = require('../assets/kqhome.png');
const profilePic = require('../assets/ppic.png');

export default function RatingPage({route, navigation}) {
  const server_url = process.env.EXPO_PUBLIC_API_URI;
  const apiKey = process.env.EXPO_PUBLIC_TMDB_API_KEY;
  const id = route.params['id']
  const catId = '62d1d2f3c9b0232c732752ff'

  const [showConsumerRatings, setShowConsumerRatings] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [showAfterRating, setShowAfterRating] = useState(false);
  const [movieData, setMovieData] = useState([]);
  const [userData, setUserData] = useState();
  const [kqRatings, setKqRatings] = useState([]);
  const [latestMovieRating, setLatestMovieRating] = useState([]);
  const [movieQuestions, setMovieQuestions] = useState([]);
  const [movieRatings, setMovieRatings] = useState({
    movieName: "",
    platform: 'Youtube',
    ratings: [],
  });

  useEffect(() => {
    const getUserData = async () => {
      // Fetch and set user data from AsyncStorage
      try {
        const token = await AsyncStorage.getItem('loginToken');
        if (token) {
          const tokenParts = token.split('.');
          const encodedPayload = tokenParts[1];
          const rawPayload = Buffer.from(encodedPayload, 'base64').toString();
          const userData = JSON.parse(rawPayload);
          setUserData(userData);
        }
      } catch (error) {
        console.error('Error reading data from AsyncStorage:', error);
      }
    };
    getUserData();
  }, []);
  let userID;
  if (userData) {
    userID = userData.id;
  }

  useEffect(() => {
    const showRatings = async () => {
      // Show user's ratings based on whether they have already rated the movie
      if (userData) {
        const fetchUserRated = `${server_url}/fetchIfUserRated/${id}/${userData.id}`;
        const didTheyRate = await axios.get(fetchUserRated);
        if (didTheyRate.data) {
          await getLatestMovieRating();
          await getMovieKQRatings();
          setShowButton(!didTheyRate.data);
          setShowConsumerRatings(true);
        }
      }
    };
    if (userData) {
      showRatings();
    }
  }, [id, apiKey, server_url, catId, userData]);

  useEffect(() => {
    const getMovieById = async () => {
      // Fetch movie data and corresponding questions based on movieID
      try {
        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`;
        const response = await axios.get(url);

        const fetchRatingQuestionUrl = `${server_url}/get-all-rating-questions/${catId}`;
        const getRatingQuestionResponse = await axios.get(fetchRatingQuestionUrl);

        const fetchRatingsUrl = `${server_url}/fetchMovieRatingsByMovieId/${id}`;
        const ratings = await axios.get(fetchRatingsUrl);
        setMovieRatings({...movieRatings, movieName: response.data.title});
        setMovieData(response.data);
        setMovieQuestions(getRatingQuestionResponse.data);
        setKqRatings(ratings.data);

        getRatingQuestionResponse.data.map((ratingQuestion) => {
          let question = ratingQuestion.question;
          setMovieRatings((prev) => ({
            ...prev,
            ratings: [
              ...prev.ratings,
              {
                questionId: ratingQuestion._id,
                questionTitle: question,
                rating: 0,
                description: ratingQuestion.description,
              },
            ],
          }));
        });
      } catch (err) {
        console.log(err);
      }
    };
    getMovieById();
  }, [id, apiKey, server_url, catId]);

  const getMovieKQRatings = async (articleURL) => {
    // API call to fetch movie data
    try {
      const url = `${server_url}/fetchMovieRatingsByMovieId/${id}`;
      const ratings = await axios.get(url);
      setKqRatings(ratings.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getLatestMovieRating = async () => {
    // Fetch lasted data for a specific user and movie
    const fetchMovieRatingsUrl = `${server_url}/fetchLatestMovieRatingForUser/${id}/${userData.id}`;
    const latestRatingFetch = await axios.get(fetchMovieRatingsUrl);
    setLatestMovieRating(latestRatingFetch.data);
  };

  const handleBarCodeScanned = ({type, data}) => {
    // Handle the event when a barcode is scanned
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
            navigation.navigate('ProductRating');
          },
        },
      ],
      {cancelable: false}
    );
  };

  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const openCamera = () => {
    setIsCameraOpen(true);
  };

  const handleMovieRating = (qId, value) => {
    // Update the movie ratings state
    return setMovieRatings((prev) => {
      return {
        ...prev,
        ratings: movieRatings.ratings.map((x) => (x.questionId === qId ? {...x, rating: value * 2} : x)),
      };
    });
  };

  const handleMovieRatingSubmit = async () => {
    // Handle movie ratings submission to master database, store then submit via API
    let userId = userID;
    let movieId = id;
    let timestamp = new Date();

    const finalMovieRating = {
      ...movieRatings,
      userId,
      movieId,
      catId,
      timestamp,
    };
    const myProductsData = {
      userId,
      catId,
      contentId: id,
      contentTitle: movieData.name,
      backdrop_path: movieData.background_image,
      timestamp,
    };
    const sendToMaster = {
      userId,
      catId,
      context: [
        {movieId: movieData.id},
        {movieName: movieData.title},
        {platform: 'Youtube'},
        {backdrop_path: movieData.backdrop_path},
        {TimeStamp: timestamp},
      ],
      ratings: [movieRatings.ratings],
    };

    try {
      const postMovieRatingUrl = `${server_url}/rateMovie`;

      // eslint-disable-next-line no-unused-vars
      const respOrder = await axios.post(postMovieRatingUrl, JSON.stringify(finalMovieRating), {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.log(err);
    }
    try {
      const postRatingURL = `${server_url}/rateMaster`;
      // eslint-disable-next-line no-unused-vars
      const respOrder = await axios.post(postRatingURL, JSON.stringify(sendToMaster), {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.log(err);
    }
    setShowAfterRating(true);
  };

  return (
    <View style={styles.container}>

      <StatusBar style="auto"/>

      {/* Rendering for camera */}
      {isCameraOpen ? (
        <View style={styles.cameraContainer}>
          <CameraComponent onBarCodeScanned={handleBarCodeScanned}/>
        </View>
      ) : (
        <View style={styles.container1}>
          {/* Back Button */}
          {/* <Pressable style={styles.button} onPress={() => navigation.navigate('Home')}> */}
          <Pressable style={styles.button} onPress={() => navigation.goBack()}>
            <AntDesign name="left" size={23} color="grey"/>
          </Pressable>

          {/* Home Button */}
          <View style={{
            height: 40,
            width: 80,
            marginTop: '12%',
            borderColor: 'transparent',
            borderWidth: 1,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Pressable onPress={() => navigation.navigate('Home')}>
              <Image source={logo} style={{aspectRatio: 1, width: 40, height: '100%'}}>
              </Image>
            </Pressable>
          </View>

          <View style={{flexDirection: 'row', marginTop: '12%', width: 80, height: 40}}>
            {/* Search */}
            <Pressable style={styles.searchContainer}
                       onPress={() => navigation.navigate('SearchPage')}>
              <FontAwesome name="search" size={20} color="#333399" style={{}}/>
            </Pressable>

            {/* Account */}
            <TouchableOpacity onPress={() => navigation.navigate('AccountInfo')}>
              <Image source={profilePic} style={{height: '100%', width: 40, borderRadius: 50, aspectRatio: 1,}}>
              </Image>
            </TouchableOpacity>
          </View>

        </View>
      )}

      {/* ProductCard for movie */}
      <ScrollView style={styles.cardContainer} contentContainerStyle={styles.cardContentContainer}>
        <ProductCard movieId={id}/>
      </ScrollView>

      <ScrollView style={styles.rateContainer}>
        {!showConsumerRatings && !showAfterRating && (
          <>
            {/* Show rating bar iff user not rated */}
            <Text style={{fontWeight: 'bold', paddingLeft: 20}}>{'\n'}Rate Your Experience{'\n'}</Text>
            {
              movieQuestions.map((ques, idx) => {
                return (
                  <View key={idx}>
                    <Text style={{paddingLeft: 20}}>{ques.question}{'\n'}</Text>
                    {/* <RatingBarRework changeMovieRating = {handleMovieRating} ques = {ques}/> */}
                    <RatingBar changeMovieRating={handleMovieRating} ques={ques}/>
                  </View>
                )
              })
            }
          </>
        )}

        {/* Submit Button */}
        {showButton && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                handleMovieRatingSubmit()
                Alert.alert("Ratings Recieved", "You have successfully submitted your ratings!")
                setShowButton(false)
              }}
              style={styles.touchableButton}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Show overall ratings after user rated */}
        {showAfterRating && (
          <>
            <Text style={{fontWeight: 'bold', paddingLeft: 20}}>{'\n'}Consumer Ratings{'\n'}</Text>
            <Text style={{paddingLeft: 20, color: '#36119C'}}> KnowQuest Rating:
              {getAvgRating(kqRatings, movieQuestions) !== 0 ? Math.abs(getAvgRating(kqRatings, movieQuestions) / 2).toFixed(1) : 0}
              /10</Text>
            {
              movieQuestions.map((ques, idx) => {
                const ratingNum = (avgRatingsByQuestionId(kqRatings, ques._id, id)).toFixed(1)
                return (
                  <View key={idx}>
                    <Text style={{paddingLeft: 20}}>{ques.question}{'\n'}</Text>
                    <ReviewBar ratingNum={ratingNum}/>
                  </View>
                )
              })
            }
          </>
        )}

        {/* Show ratings when second time click in */}
        {
          showConsumerRatings && (
            <>
              <Text style={{fontWeight: 'bold', paddingLeft: 20}}>{'\n'}Your Ratings{'\n'}</Text>
              {
                movieQuestions.map((ques, idx) => {
                  const userRating = (getRatingByQuestionId(ques._id, latestMovieRating.movieId, latestMovieRating.ratings, id))
                  return (
                    <View key={idx}>
                      <Text style={{paddingLeft: 20}}>{ques.question}{'\n'}</Text>
                      <UserReviewBar ratingNum={userRating}/>
                    </View>
                  )
                })
              }
              <Text style={{fontWeight: 'bold', paddingLeft: 20}}>{'\n'}Consumer Ratings{'\n'}</Text>
              <Text style={{paddingLeft: 20, color: '#36119C'}}> KnowQuest Rating:
                {getAvgRating(kqRatings, movieQuestions) !== 0 ? Math.abs(getAvgRating(kqRatings, movieQuestions) / 2).toFixed(1) : 0}
                /10</Text>
              {
                movieQuestions.map((ques, idx) => {
                  const ratingNum = (avgRatingsByQuestionId(kqRatings, ques._id, id)).toFixed(1)
                  return (
                    <View key={idx}>
                      <Text style={{paddingLeft: 20}}>{ques.question}{'\n'}</Text>
                      <ReviewBar ratingNum={ratingNum}/>
                    </View>
                  )
                })
              }
            </>
          )}
      </ScrollView>
    </View>
  );
};

const deviceWidth = Math.round(Dimensions.get('window').width)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 90,
    backgroundColor: '#fbfbff',
    alignItems: 'center',
    height: '9.5%',
    // justifyContent: 'center',
  },
  cardContainer: {
    paddingTop: '3%',
    height: '60%',
    marginBottom: '2%',
  },
  cardContentContainer: {
    paddingBottom: '2%',
  },
  rateContainer: {
    paddingRight: '30%',
  },
  buttonContainer: {
    width: '55%',
    alignSelf: 'center',
    marginVertical: 20,
    paddingLeft: '25%'
  },
  touchableButton: {
    width: '100%',
    paddingVertical: 10,
    backgroundColor: 'orange',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  //Will be replaced by fully function Navigation Bar
  bottomNavigation: {
    width: deviceWidth,
    height: 90,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
    shadowColor: '#444444',
    shadowOffset: {
      width: 0,
      height: 3
    },
    position: 'absolute',
    bottom: 0
  },
  cameraContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1, // Ensure the camera is displayed above other elements
  },
  searchContainer: {
    // marginTop: '12%',
    // marginLeft:'20%',
    height: 40,
    backgroundColor: '#f4f4f4',
    width: 40,
    marginRight: 5,
    borderRadius: 50,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 10,
  },
  container1: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    height: '13%',
    width: '100%',
    paddingBottom: 0,
    elevation: 2,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    paddingHorizontal: '5%',
  },
  button: {
    borderRadius: 10,
    alignItems: 'left',
    justifyContent: 'center',
    height: 40,
    width: 80,
    marginTop: '12%',
  },
});