import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  useWindowDimensions,
  View,
  ScrollView
} from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import {
  getPopularMovies,
  getUpcomingMovies,
  getPopularTv,
  getFamilyMovies,
  getDocumentaryMovies
} from '../services/services';
import List from '../components/List';
import Error from '../components/Error';
import { BASE_IMAGE_URL } from '@env';
import Loading from '../components/Loading';

const Home = () => {
  const { height } = useWindowDimensions();

  const [moviesImages, setMoviesImages] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTv, setPopularTv] = useState([]);
  const [familyMovies, setFamilyMovies] = useState([]);
  const [documentaryMovies, setDocumentaryMovies] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const getData = () => {
    return Promise.all([
      getUpcomingMovies(),
      getPopularMovies(),
      getPopularTv(),
      getFamilyMovies(),
      getDocumentaryMovies(),
    ])
  }

  useEffect(() => {
    getData()
      .then(([
        getUpcomingMoviesData,
        getPopularMoviesData,
        getPopularTvData,
        getFamilyMoviesData,
        getDocumentaryMoviesData,
      ]) => {
        const moviesImagesArray = [];
        getUpcomingMoviesData.map(movie => {
          moviesImagesArray.push(`${BASE_IMAGE_URL}${movie.poster_path}`);
        });
        setMoviesImages(moviesImagesArray);
        setPopularMovies(getPopularMoviesData);
        setPopularTv(getPopularTvData);
        setFamilyMovies(getFamilyMoviesData);
        setDocumentaryMovies(getDocumentaryMoviesData);
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
              <View style={styles.sliderContainer}>
                <SliderBox
                  images={moviesImages}
                  dotStyle={styles.dots}
                  autoplay={true}
                  autoplayInterval={7000}
                  circleLoop={true}
                  sliderBoxHeight={(2 / 3) * height}
                />
              </View>

              <View style={styles.carousel}>
                <List title='Popular Movies' content={popularMovies} />
              </View>

              <View style={styles.carousel}>
                <List title='Popular TV Shows' content={popularTv} />
              </View>

              <View style={styles.carousel}>
                <List title='Family Movies' content={familyMovies} />
              </View>

              <View style={styles.carousel}>
                <List title='Documentary Movies' content={documentaryMovies} />
              </View>
            </ScrollView>
      }
    </>
  );
}

const styles = StyleSheet.create({
  sliderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dots: {
    height: 0
  },
  carousel: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Home;