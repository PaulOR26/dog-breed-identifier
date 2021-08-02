import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Alert } from 'react-native';
import { Card } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { getDogInfo } from '../utils/api';

const CardDisplay = ({ dogUri }) => {
  const [dogObject, setDogObject] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const breed = 'cockerspaniel';
  useEffect(() => {
    getDogInfo(breed)
      .then((dataFromApi) => {
        console.log(dataFromApi);
        setDogObject(dataFromApi);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const deleteAlert = () => {
    Alert.alert('Warning!', 'Are you sure you want to delete your card?', [
      {
        text: 'yes',
        onPress: () => console.log('card deleted'),
        style: 'tick',
      },
      { text: 'No', onPress: () => console.log('okay') },
    ]);
  };
  if (isLoading) {
    return <Text>...is loading</Text>;
  }
  return (
    <View style={styles.container}>
      <Card>
        <Card.Image
          source={{ uri: dogUri }}
          style={{ width: 400, height: 300 }}
        />
        <Card.Divider />
        <Card.Title style={styles.title}>
          {dogObject.breedInformation.breed}
        </Card.Title>
        <Image
          style={styles.stockImage}
          source={{ uri: dogObject.breedInformation.dog_url }}
        />
        <View style={styles.text}>
          <Text>Percentage match: Hardcoded at 76%</Text>
          <Text>Temperament: {dogObject.breedInformation.temperament}</Text>
          <Text>
            Characteristics: {dogObject.breedInformation.characteristics}
          </Text>
          <Text>
            Exercise requirements: {dogObject.breedInformation.exercise}
          </Text>
          <Text>Size: {dogObject.breedInformation.size}</Text>
        </View>
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
    backgroundColor: '#5f9ea0',
  },
  stockImage: {
    borderRadius: 50,
    width: 100,
    height: 100,
    alignSelf: 'flex-end',
  },
  title: {
    fontSize: 30,
  },
  text: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  icon: {
    color: '#5f9ea0',
    width: 70,
    height: 90,
    alignSelf: 'flex-end',
  },
});
CardDisplay.propTypes = {
  dogUri: PropTypes.string,
  route: PropTypes.object,
};

export default CardDisplay;
