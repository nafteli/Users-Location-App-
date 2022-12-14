import {addToCollection} from './firebaseDB/add';

export const checkCoordinates = (coordinates, currentLocation) => {
  if (!coordinates || !currentLocation) {
    console.error('I have to get coordinates and currentLocation');
    return;
  }
  if ((typeof currentLocation && typeof coordinates) !== 'object') {
    console.error('I only know how to handle objects');
    return;
  }
  if (
    cutCoordinate(coordinates.latitude) !==
      cutCoordinate(currentLocation.latitude) ||
    cutCoordinate(coordinates.longitude) !==
      cutCoordinate(currentLocation.longitude)
  ) {
    addToCollection({
      latitude: currentLocation.latitude,
      longitude: currentLocation.longitude,
    });
  }
};

const cutCoordinate = number => {
  if (!number) {
    console.error('I did not receive coordinates');
    return;
  }
  if (typeof number !== 'number') {
    console.error(`coordinates must be a number and ${number} is not`);
    return;
  }
  return number.toString().split('.')[1].substring(0, 3);
};
