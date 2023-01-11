import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { BASE_IMAGE_URL } from '@env';
import { useNavigation } from '@react-navigation/native';

const placeholderImage = require('../assets/images/movie-image.png');

const propTypes = {
  item: PropTypes.object,
  navigation: PropTypes.object,
};

const withHookHOC = (Component) => {
  return (props) => {
    const navigation = useNavigation();

    return <Component navigation={navigation} {...props} />
  }
}

class Card extends React.PureComponent {
  render() {
    const { item, navigation: { navigate } } = this.props;

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => navigate('Detail', { id: item.id, isMovie: !!item.title })}
      >
        <Image
          style={styles.movieImage}
          resizeMode='cover'
          source={
            item.poster_path ?
              { uri: `${BASE_IMAGE_URL}${item.poster_path}` } :
              placeholderImage
          }
        />
        {!item.poster_path && <Text style={styles.movieName}>{item.title}</Text>}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    position: 'relative',
    alignItems: 'center',
    height: 200,
  },
  movieImage: {
    height: '100%',
    width: 120,
    borderRadius: 20,
  },
  movieName: {
    position: 'absolute',
    width: 100,
    textAlign: 'center',
    bottom: 30,
  }
});

Card.propTypes = propTypes;

export default withHookHOC(Card);