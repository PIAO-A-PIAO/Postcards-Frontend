import React, {useEffect, useState} from "react";
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native'
import axios from "axios";

const ProductCard = ({movieId}) => {
  const server_url = process.env.REACT_APP_API_URI;
  const apiKey = process.env.EXPO_PUBLIC_TMDB_API_KEY;
  const id = movieId

  const [movieData, setMovieData] = useState([]);
  useEffect(() => {
    const getMovieById = async () => {
      try {
        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`;
        const response = await axios.get(url);
        setMovieData(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMovieById();
  }, [id, apiKey, server_url]);

  return (

    <View style={styles.cardContainer}>
      <View style={styles.movieContent}>
        <Image style={styles.imageStyle}
               source={{uri: `https://image.tmdb.org/t/p/original/${movieData.poster_path}`}}
        />
        <View style={styles.textContainer}>
          <Text style={styles.textTitleStyle} numberOfLines={1}>
            {movieData.title}
          </Text>
          <Text style={styles.textDescriptionStyle} numberOfLines={1}>
            Genre: {" "}
            {movieData?.genres?.map((genre, idx) => (
              <Text key={genre.id}>
                {idx === movieData.genres.length - 1 ? genre.name : genre.name + ", "}
              </Text>
            ))}
          </Text>
          <Text style={styles.textDescriptionStyle} numberOfLines={1}>
            Release Date: {movieData.release_date}
          </Text>
          <Text style={styles.textDescriptionStyle} numberOfLines={1}>
            Runtime: {movieData.runtime} mins
          </Text>
        </View>
      </View>
      <Text style={styles.movieOverview}>
        {movieData.overview}
      </Text>
    </View>

  );
};

const deviceWidth = Math.round(Dimensions.get('window').width)
const styles = StyleSheet.create({
  cardContainer: {
    width: deviceWidth,
    backgroundColor: '#fbfbff',
    // height : 200,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: 10,
    marginTop: 10,
  },
  movieContent: {
    flexDirection: 'row',
    marginBottom: '5%',
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: '3%',
    flexShrink: 1,
    width: '60%',
  },
  imageStyle: {
    height: '135%',
    width: '30%',
    marginLeft: '5%',
    aspectRatio: 0.7,
    borderRadius: 10,
  },
  iconStyle: {
    width: 6,
    height: 8,
    marginRight: 2
  },
  textTitleStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#36119C',
    marginRight: '12%',
  },
  textDescriptionStyle: {
    fontSize: 12,
    fontWeight: 200,
  },
  movieOverview: {
    fontSize: 12,
    paddingHorizontal: '4%',
    textAlign: "left",
  }
});

export default ProductCard;