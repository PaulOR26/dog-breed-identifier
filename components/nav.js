import React from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import PropTypes from 'prop-types';
import { snap } from '../utils/camera.utils';

const Nav = ({ navigation, state, camera }) => {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          navigation.navigate('History');
        }}
        style={styles.historyButton}
      >
        <Text>History</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          if (state.routeNames[state.index] === 'Home') {
            snap(camera).then((key) => {
              navigation.navigate('History', { key: key });
            });
          } else {
            navigation.navigate('Home');
          }
        }}
        style={styles.photoButton}
      >
        <Text>Take photo</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '10%',
    width: '100%',
    backgroundColor: 'blue',
    flexDirection: 'row',
  },
  historyButton: {
    width: '20%',
    height: '100%',
    backgroundColor: 'green',
  },
  photoButton: {
    width: '40%',
    height: '100%',
    backgroundColor: 'red',
    marginLeft: '10%',
  },
});

Nav.propTypes = {
  navigation: PropTypes.object,
  state: PropTypes.object,
  camera: PropTypes.object,
};

export default Nav;
