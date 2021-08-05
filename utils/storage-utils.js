import * as FileSystem from 'expo-file-system';

const dogsDir = FileSystem.documentDirectory + 'dogs/';
const photoDir = FileSystem.documentDirectory + 'pics/';

export const storeDogPic = async (uri) => {
  const newUri = `${photoDir}/${Date.now()}.jpg`;
  const directoryInfo = await FileSystem.getInfoAsync(photoDir);
  if (!directoryInfo.exists) {
    await FileSystem.makeDirectoryAsync(photoDir, { intermediates: true });
  }
  await FileSystem.moveAsync({
    from: uri,
    to: newUri,
  });
  return newUri;
};

export const storeDogObj = async (dogObj) => {
  const newUri = `${dogsDir}${Date.now()}.txt`;
  const newDogObj = { newUri: newUri, ...dogObj };
  const directoryInfo = await FileSystem.getInfoAsync(dogsDir);
  if (!directoryInfo.exist) {
    await FileSystem.makeDirectoryAsync(dogsDir, { intermediates: true });
  }
  await FileSystem.writeAsStringAsync(newUri, JSON.stringify(newDogObj));
  return newDogObj;
};
export const readDogObject = async (dogUri) => {
  const dogObject = await FileSystem.readAsStringAsync(dogUri);
  return JSON.parse(dogObject);
};

export const readDirectory = async () => {
  const dogObjectsArray = await FileSystem.readDirectoryAsync(dogsDir);
  const directoryInfo = await FileSystem.getInfoAsync(dogsDir);
  if (!directoryInfo.exist) {
    await FileSystem.makeDirectoryAsync(dogsDir, { intermediates: true });
  }
  const dogPromises = dogObjectsArray.map((dogFile) => {
    return FileSystem.readAsStringAsync(`${dogsDir}${dogFile}`).then(
      (result) => {
        return JSON.parse(result);
      }
    );
  });
  return Promise.all(dogPromises);
};
export const deleteCard = async (dogObject) => {
  await FileSystem.deleteAsync(dogObject.newUri);
};
