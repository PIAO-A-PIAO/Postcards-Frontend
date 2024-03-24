// import packages
import React, {useEffect, useState} from 'react';
import {ImageBackground, Pressable, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View,} from 'react-native';
import axios from "axios";
import * as constant from '../constants';

// Import vector icons
import Icon from 'react-native-vector-icons/FontAwesome';
import {AntDesign} from '@expo/vector-icons';

export default function CategoryOverview({route, navigation}) {
  // TMDB URL and API key
  const server_url = process.env.EXPO_PUBLIC_API_URI;
  const apiKey = process.env.EXPO_PUBLIC_TMDB_API_KEY;

  const [movies, setMovies] = useState([]);
  const currentPage = 1;
  const [movieUrl, setMovieUrl] = useState("");

  useEffect(() => {
    const getMovie = async () => {
      try {
        const nowPlayingUrl =
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=` +
          currentPage;

        let response = "";

        setMovieUrl(nowPlayingUrl)

        // get array of now playing movie
        response = await axios.get(nowPlayingUrl);

        const moviesData = response.data.results;
        setMovies(moviesData);

      } catch (err) {
        console.log(err);
      }
    };
    getMovie();


  }, [currentPage, server_url, apiKey]);

  return (
    <>
      <View style={styles.container}>
        {/* header */}
        <Pressable style={styles.button} onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={23} color="grey"/>
        </Pressable>

        <View style={{height: 40, justifyContent: 'center', alignItems: 'center', marginTop: '12%',}}>
          <Text style={{fontWeight: 'bold', color: constant.PRIMARY_COLOR, fontSize: 23, textAlignVertical: 'bottom',}}>Rate
            your experience</Text>
        </View>

        <Pressable style={styles.button} onPress={() => navigation.navigate('SearchPage')}>
          <Icon name="search" size={23} color="grey"/>
        </Pressable>

      </View>

      <View style={styles.textCategory}>
        <Pressable style={{marginLeft: 10, marginRight: 10, borderBottomColor: '#80279B', borderBottomWidth: 2,}}>
          <Text style={{
            fontSize: 15,
            fontWeight: 'bold',
            color: constant.PRIMARY_COLOR,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            Movies
          </Text>
        </Pressable>
      </View>

      <View style={{justifyContent: 'center', alignItems: 'center', height: '3%',}}>
        <Text style={{fontSize: 15, justifyContent: 'center', alignItems: 'center',}}>
          Trending Movies
        </Text>

      </View>

      {/* display all trending movies */}
      <ScrollView contentContainerStyle={{paddingBottom: 40,}}>
        {movies.map((movie, index) => (
          index % 2 === 0 && index != movies.length - 1 ? ( // map movies two in row, thus map all movies at even index to the left and movies at odd index to the right

              <View style={{flexDirection: "row", paddingHorizontal: 10, paddingTop: 15, height: 250,}}>

                {/* movie block on the left */}
                <TouchableWithoutFeedback onPress={() => navigation.navigate('ProductRating', {id: movies[index].id})}>

                  <View style={{borderRadius: 10, width: '49%',}}>
                    <ImageBackground source={{uri: `https://image.tmdb.org/t/p/original/${movies[index].backdrop_path}`}}
                                     style={styles.rateImg} imageStyle={{borderRadius: 10,}}>
                      <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 10}}>
                        <Text numberOfLines={1} style={{
                          color: '#FFFFFF',
                          fontSize: 17,
                          marginTop: 180,
                          marginHorizontal: 10,
                          fontWeight: 'bold',
                        }}> {movies[index].title} </Text>
                      </View>
                    </ImageBackground>
                  </View>

                </TouchableWithoutFeedback>

                <View style={{borderWidth: 0, borderColor: '#C0C0C0', width: '2%'}}></View>

                {/* movie block on right */}
                <TouchableWithoutFeedback
                  onPress={() => navigation.navigate('ProductRating', {id: movies[index + 1].id})}>

                  <View style={{borderRadius: 10, width: '49%',}}>
                    <ImageBackground
                      source={{uri: `https://image.tmdb.org/t/p/original/${movies[index + 1].backdrop_path}`}}
                      style={styles.rateImg} imageStyle={{borderRadius: 10,}}>
                      <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 10}}>
                        <Text numberOfLines={1} style={{
                          color: '#FFFFFF',
                          fontSize: 17,
                          marginTop: 180,
                          marginHorizontal: 10,
                          fontWeight: 'bold',
                        }}> {movies[index + 1].title} </Text>
                      </View>
                    </ImageBackground>
                  </View>

                </TouchableWithoutFeedback>

              </View>) :
            (index % 2 === 0 && index === movies.length - 1) ? ( // if total number of now trending movie is odd, then the last row must have only one movie
              <View style={{flexDirection: "row", paddingHorizontal: 10, paddingTop: 15, height: 250,}}>

                <TouchableWithoutFeedback onPress={() => navigation.navigate('ProductRating', {id: movies[index].id})}>

                  <View style={{borderRadius: 10, width: '49%',}}>
                    <ImageBackground
                      source={{uri: `https://image.tmdb.org/t/p/original/${movies[index].backdrop_path}`}}
                      style={styles.rateImg} imageStyle={{borderRadius: 10,}}>
                      <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 10}}>
                        <Text numberOfLines={1} style={{
                          color: '#FFFFFF',
                          fontSize: 17,
                          marginTop: 180,
                          marginHorizontal: 10,
                          fontWeight: 'bold',
                        }}> {movies[index].title} </Text>
                      </View>
                    </ImageBackground>
                  </View>

                </TouchableWithoutFeedback>

                <View style={{borderWidth: 0, borderColor: '#C0C0C0', width: '2%'}}></View>

              </View>

            ) : null

        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    height: '10%',
    paddingBottom: 0,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    paddingHorizontal: '5%'
  },
  textCategory: {
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
    marginTop: '12%',
  },
  imageContainer: {
    flex: 1,
    backgroundColor: '#000000',
    borderRadius: 18,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  rateImg: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
});
