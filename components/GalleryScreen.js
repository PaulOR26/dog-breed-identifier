import React from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useState, useEffect } from 'react';
import { readDirectory } from '../utils/storage-utils';
import Loading from './Loading';

const GalleryScreen = ({ setCurrentDog }) => {
  const [isLoading, setIsLoading] = useState(true);

  const [allDogs, setAllDogs] = useState([]);

  useEffect(() => {
    readDirectory()
      .then((dogArray) => {
        setAllDogs(dogArray);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  if (isLoading) {
    return (
      <View>
        <Loading />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        {allDogs.map((dogObject) => {
          return (
            <TouchableOpacity
              key={dogObject.photoUri}
              onPress={() => {
                setCurrentDog(dogObject);
              }}
            >
              <Image
                style={styles.image}
                source={{ uri: dogObject.photoUri }}
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#008080',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },

  scrollView: {
    height: '100%',
    width: '100%',
    marginTop: 0,
    alignSelf: 'center',
    padding: 20,
    paddingTop: 30,
    backgroundColor: '#008080',
  },
  image: {
    width: 90,
    height: 90,
    margin: 3,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ffebcd',
  },
});

GalleryScreen.propTypes = {
  setCurrentDog: PropTypes.func,
};

export default GalleryScreen;
