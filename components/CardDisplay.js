import React from 'react';
import { View, Text, Image, StyleSheet, Alert } from 'react-native';
import { Card } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

import { deleteCard } from '../utils/storage-utils';

const CardDisplay = ({ dogObject, setCurrentDog, navigation }) => {
  const deleteAlert = () => {
    Alert.alert('Warning!', 'Are you sure you want to delete this card?', [
      {
        text: 'Confirm delete',
        onPress: () => {
          deleteCard(dogObject).then(() => {
            setCurrentDog(null);
            navigation.navigate('History', { navFrom: 'notsnap' });
          });
        },
        style: 'tick',
      },
      { text: 'Cancel' },
    ]);
  };

  return (
    <View style={styles.container}>
      <Card>
        <Card.Image
          style={styles.photo}
          source={{ uri: `${dogObject.photoUri}` }}
        />
        <Card.Divider />
        <Card.Title style={styles.title}>{dogObject.breed}</Card.Title>
        <View style={styles.text}>
          <Image
            style={styles.stockImage}
            source={{ uri: `${dogObject.dog_url}` }}
          />
        </View>
        <Text style={styles.text}>
          Percentage Match: {Math.floor(dogObject.confidences * 100)}%
        </Text>
        <Text style={styles.text}>Temperament: {dogObject.temperament}</Text>
        <Text style={styles.text}>
          Characteristics: {dogObject.characteristics}
        </Text>
        <Text style={styles.text}>
          Exercise requirements:
          {dogObject.exercise}
        </Text>
        <Text style={styles.text}>Size: {dogObject.size}</Text>
        <FontAwesomeIcon
          size={30}
          style={styles.icon}
          icon={faTrash}
          onPress={deleteAlert}
        ></FontAwesomeIcon>
      </Card>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: '85%',
  },
  stockImage: {
    borderRadius: 50,
    width: 90,
    height: 90,
    alignSelf: 'flex-end',
    borderWidth: 1,
    borderColor: 'black',
  },
  title: {
    fontSize: 30,
  },
  text: {
    textAlign: 'left',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#008b8b',
  },
  icon: {
    color: '#5f9ea0',
    width: 70,
    height: 90,
    alignSelf: 'flex-end',
  },
  photo: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 3,
    width: 400,
    height: 300,
    marginTop: 20,
  },
});
CardDisplay.propTypes = {
  dogUri: PropTypes.string,
  route: PropTypes.object,
  dogObject: PropTypes.object,
  setCurrentDog: PropTypes.func,
  navigation: PropTypes.object,
};

export default CardDisplay;
