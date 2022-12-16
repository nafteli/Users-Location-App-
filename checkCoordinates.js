import {addToCollection} from './firebaseDB/add';
import {getDistance, getPreciseDistance} from 'geolib';

export const checkCoordinateswithgetdistance = (
  oldCordinates,
  newCordinates,
) => {
  console.log(
    'oldCordinates:',
    oldCordinates.latitude,
    oldCordinates.longitude,
    'newCordinates',
    newCordinates.latitude,
    newCordinates.longitude,
  );
  if (!oldCordinates && !newCordinates) {
    return;
  }
  let distance = getPreciseDistance(
    {latitude: oldCordinates.latitude, longitude: oldCordinates.longitude},
    {latitude: newCordinates.latitude, longitude: newCordinates.longitude},
  );
  console.log('distance:', distance);
  return distance;
};

export const checkCoordinates = (coordinates, currentLocation) => {
  if (!coordinates || !currentLocation) {
    console.error('I have to get coordinates and currentLocation');
    return;
  }
  if ((typeof currentLocation && typeof coordinates) !== 'object') {
    console.error('I only know how to handle objects');
    return;
  }
  let distance = checkCoordinateswithgetdistance(coordinates, currentLocation);
  if (distance >= 1000) {
    console.log('I write the coordinates to the database');
    addToCollection({
      latitude: currentLocation.latitude,
      longitude: currentLocation.longitude,
    });
  }
  if (distance < 1000) {
    console.log('The distance is too small its:', distance);
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
