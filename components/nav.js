import React from 'react';
import { StyleSheet, View, Text, Alert, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { snap } from '../utils/camera.utils';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHistory, faCamera, faDog } from '@fortawesome/free-solid-svg-icons';

const Nav = ({ navigation, state, camera, setCurrentDog }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
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
      </TouchableOpacity>
      <TouchableOpacity
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
      </TouchableOpacity>
      <TouchableOpacity
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
          size={33}
          style={styles.icon}
          icon={faDog}
        ></FontAwesomeIcon>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '10%',
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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoButton: {
    width: '40%',
    height: '90%',
    backgroundColor: '#5f9ea0',
    marginTop: '1%',
    borderWidth: 1,
    borderColor: '#f5fffa',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 5,
  },
  buttonText: {
    padding: 4,
    alignSelf: 'center',
    fontWeight: '500',
    fontSize: 10,
  },
  icon: {
    alignSelf: 'center',
    color: '#ffebcd',
    marginBottom: 5,
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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

Nav.propTypes = {
  navigation: PropTypes.object,
  state: PropTypes.object,
  camera: PropTypes.object,
  setCurrentDog: PropTypes.func,
};

export default Nav;
