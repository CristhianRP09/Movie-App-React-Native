import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Error from '../components/Error';
import { getDetails } from '../services/services';
import PropTypes from 'prop-types';
import { BASE_IMAGE_URL } from '@env';
import Loading from '../components/Loading';
import Ratings from 'react-ratings-declarative';

const placeholderImage = require('../assets/images/movie-image.png');

const propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
}

const Detail = ({ route, navigation }) => {
  const { id, isMovie } = route.params;

  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { height } = useWindowDimensions();

  useEffect(() => {
    getDetails(id, isMovie)
      .then(elem => {
        setDetail(elem);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, []);

  return (
    <>
      {
        loading ? <Loading /> :
          error ? <Error /> :
            <ScrollView>
              <Image
                style={{ height: (2 / 3) * height }}
                resizeMode='cover'
                source={
                  detail.poster_path ?
                    { uri: `${BASE_IMAGE_URL}${detail.poster_path}` } :
                    placeholderImage
                }
              />

              <View style={styles.titleContainer}>
                <Text style={styles.title}>{isMovie ? detail.title : detail.name}</Text>
                {
                  detail.genres ?
                    <View style={styles.genresContainer}>
                      {
                        detail.genres.map((genre, index) => (
                          <Text
                            style={styles.genre}
                            key={index}
                          >
                            {genre.name}
                          </Text>
                        ))
                      }
                    </View> :
                    <></>
                }
                <Text>{detail.vote_average / 2}</Text>
                <Ratings
                  rating={detail.vote_average / 2}
                  widgetDimensions='40px'
                  widgetSpacings='15px'
                >
                  <Ratings.Widget widgetRatedColor='#00f' />
                  <Ratings.Widget widgetRatedColor='#00f' />
                  <Ratings.Widget widgetRatedColor='#00f' />
                  <Ratings.Widget widgetRatedColor='#00f' />
                  <Ratings.Widget widgetRatedColor='#00f' />
                </Ratings>
              </View>
            </ScrollView>
      }
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  title: {
    width: '100%',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#000'
  },
  genresContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  genre: {
    marginHorizontal: 10,
    color: '#000',
    fontSize: 16,
  }
});

Detail.propTypes = propTypes;

export default Detail;