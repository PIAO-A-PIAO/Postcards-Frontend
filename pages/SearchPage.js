// import package
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AntDesign, FontAwesome} from '@expo/vector-icons';
import * as components from '../components/index.js';
import axios from "axios";


const {CameraComponent} = components;

export default function SearchPage({navigation}) {
  // TMDB URL and API key
  const apiKey = process.env.EXPO_PUBLIC_TMDB_API_KEY;
  const server_url = process.env.EXPO_PUBLIC_API_URI;

  const [searchMovie, setSearchMovie] = useState("");
  const [movieUrl, setMovieUrl] = useState("");
  const currentPage = 1;
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // send axios request to tmdb
    const getMovie = async () => {
      try {
        const searchUrl =
          `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=` +
          searchMovie +
          "&page=" +
          currentPage;

        let response = "";

        setMovieUrl(searchUrl);
        // get array of search result movie
        response = await axios.get(searchUrl);

        const moviesData = response.data.results;
        setMovies(moviesData);

      } catch (err) {
        console.log(err);
      }
    };
    getMovie();
  }, [currentPage, server_url, apiKey, searchMovie]); // run code in useEffect whenever those three variable get changed

  // barcode scanned
  const handleBarCodeScanned = ({type, data}) => {
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
          text: "Go to the Page (not activated for now)",
          onPress: () => {
            setIsCameraOpen(false);
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

  return (
    <>
      {isCameraOpen ? (
        <View style={styles.cameraContainer}>
          <CameraComponent onBarCodeScanned={handleBarCodeScanned}/>
        </View>
      ) : (
        // header
        <View style={styles.container}>
          <Pressable style={styles.button} onPress={() => navigation.goBack()}>
            <AntDesign name="left" size={23} color="grey"/>
          </Pressable>
          {/* search bar */}
          <View style={styles.searchContainer}>
            <FontAwesome name="search" size={20} color="#333399" style={{flex: 0.1,}}/>
            <TextInput style={{height: 40, backgroundColor: '#f4f4f4', flex: 0.8, marginRight: 5, borderRadius: 30,}}
                       placeholder="Spy Kids: Armageddon" onChangeText={t => setSearchMovie(t)}/>
            <TouchableOpacity onPress={openCamera}>
              <FontAwesome name="qrcode" size={20} color="#7a7a7a"/>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {/* suggested searches */}
      <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 40,}}>
        {/* map all the research result get from axios previously and display here */}
        {movies.map((movie) => (
          <View style={styles.box} onPress={() => navigation.navigate('ProductRating', {id: movie.id})}>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('ProductRating', {id: movie.id})}>
              <View style={{flexDirection: "row"}}>
                <View style={styles.imageHolder}>
                  <Image source={{uri: `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}}
                         style={{borderRadius: 8, width: '100%', height: undefined, aspectRatio: 0.9,}}></Image>
                </View>
                <View style={{marginHorizontal: '5%', marginTop: '7%', width: '70%'}}>
                  <Text numberOfLines={1} style={styles.titleText}> {movie.title} </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>

        ))}

        <View style={{width: '100%', height: '100%', backgroundColor: '#FFFFFF',}}></View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'left',
    height: '12%',
    paddingBottom: 0,
    elevation: 2,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  button: {
    borderRadius: 10,
    alignItems: 'left',
    justifyContent: 'center',
    height: 40,
    width: 30,
    marginTop: '12%',
    marginLeft: 20,
  },
  box: {
    backgroundColor: '#FFFFFF',
    marginRight: 10,
    justifyContent: 'left',
    borderBottomColor: '#C0C0C0',
    borderBottomWidth: 1,
    height: 80,
    width: '100%',
  },
  imageHolder: {
    marginLeft: '6%',
    marginVertical: '1.5%',
    height: 60,
    width: 60,
  },
  titleText: {
    color: '#404040',
    fontSize: 17,
    fontWeight: 'bold',
  },
  cameraContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1, // Ensure the camera is displayed above other elements
  },
  searchContainer: {
    marginTop: '12%',
    marginLeft: 10,
    height: 40,
    backgroundColor: '#f4f4f4',
    flex: 0.9,
    marginRight: 5,
    borderRadius: 30,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 15
  }
});