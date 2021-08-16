import React from 'react';
import { StyleSheet, View, Pressable, Text, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { snap } from '../utils/camera.utils';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHistory, faCamera, faDog } from '@fortawesome/free-solid-svg-icons';

const Nav = ({ navigation, state, camera, setCurrentDog }) => {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          setCurrentDog(null);
          navigation.navigate('History', { navFrom: 'notsnap' });
        }}
        style={styles.historyButton}
      >
        <Text style={styles.buttonText}>History</Text>
        <FontAwesomeIcon
          size={30}
          style={styles.icon}
          icon={faHistory}
        ></FontAwesomeIcon>
      </Pressable>
      <Pressable
        onPress={() => {
          if (state.routeNames[state.index] === 'Home') {
            snap(camera, navigation, setCurrentDog).then((dogObject) => {
              setCurrentDog(dogObject);
            });
          } else {
            navigation.navigate('Home');
          }
        }}
        style={styles.photoButton}
      >
        <Text style={styles.buttonText}>Take photo</Text>
        <FontAwesomeIcon
          size={30}
          style={styles.icon}
          icon={faCamera}
        ></FontAwesomeIcon>
      </Pressable>
      <Pressable
        onPress={() => {
          Alert.alert(
            'DogTags',
            'Welcome to DogTags!\nTake dog snaps\nSave dog cards\nHave fun! 🐶',
            [{ text: 'Get Started!' }]
          );
        }}
        style={styles.historyButton}
      >
        <Text style={styles.buttonText}>DogTags</Text>
        <FontAwesomeIcon
          size={40}
          style={styles.icon}
          icon={faDog}
        ></FontAwesomeIcon>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '15%',
    width: '100%',
    backgroundColor: '#008080',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  historyButton: {
    width: '25%',
    height: '90%',
    backgroundColor: '#5f9ea0',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#f5fffa',
    marginTop: '1%',
  },
  photoButton: {
    width: '40%',
    height: '90%',
    backgroundColor: '#5f9ea0',
    marginTop: '1%',
    borderWidth: 1,
    borderColor: '#f5fffa',

    borderRadius: 5,
  },
  buttonText: {
    padding: 8,
    alignSelf: 'center',
    fontWeight: '500',
  },
  icon: {
    alignSelf: 'center',
    color: '#ffebcd',
  },
  iconDog: {
    alignSelf: 'center',
    marginTop: '28%',
    color: '#ffebcd',
  },
  dogIconView: {
    width: '25%',
    height: '90%',
    backgroundColor: '#5f9ea0',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#f5fffa',
    marginTop: '1%',
  },
});

Nav.propTypes = {
  navigation: PropTypes.object,
  state: PropTypes.object,
  camera: PropTypes.object,
  setCurrentDog: PropTypes.func,
};

export default Nav;
