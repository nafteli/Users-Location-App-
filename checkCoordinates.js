import {addToCollection} from './firebaseDB/add';
import {getDistance, getPreciseDistance} from 'geolib';

export const checkCoordinatesWithgetDistance = (
  oldCordinates,
  newCordinates,
) => {
  //chect if new and old coordinates exist
  if (!oldCordinates || !newCordinates) {
    console.error('I did not receive coordinates');
    return 'I did not receive coordinates';
  }
  if (
    Object.keys(oldCordinates).length < 2 ||
    Object.keys(newCordinates).length < 2
  ) {
    console.log('missing data');
    return 'missing data';
  }
  if (
    !oldCordinates.latitude ||
    !oldCordinates.longitude ||
    !newCordinates.latitude ||
    !newCordinates.longitude
  ) {
    console.error('missing data');
    return 'missing data';
  }
  //get distance
  let distance = getPreciseDistance(
    {latitude: oldCordinates.latitude, longitude: oldCordinates.longitude},
    {latitude: newCordinates.latitude, longitude: newCordinates.longitude},
  );
  console.log('distance:', distance);
  return distance;
};

export const check_lat_lon = (lat, lon) => {
  const regexLat = /^(-?[1-8]?\d(?:\.\d{1,18})?|90(?:\.0{1,18})?)$/;
  const regexLon = /^(-?(?:1[0-7]|[1-9])?\d(?:\.\d{1,18})?|180(?:\.0{1,18})?)$/;
  let validLat = regexLat.test(lat);
  let validLon = regexLon.test(lon);
  return validLat && validLon;
};

export const checkCoordinates = (coordinates, currentLocation) => {
  //chect if new and old coordinates exist
  if (!coordinates || !currentLocation) {
    console.error('I have to get coordinates and currentLocation');
    return 'I have to get coordinates and currentLocation';
  }
  //chect if new and old coordinates in type object
  if ((typeof currentLocation || typeof coordinates) !== 'object') {
    console.error('I only know how to handle objects');
    return 'I only know how to handle objects';
  }
  if (
    Object.keys(coordinates).length < 2 ||
    Object.keys(currentLocation).length < 2
  ) {
    console.error('missing data');
    return 'missing data the Object < 2';
  }
  if (
    !coordinates.latitude ||
    !coordinates.longitude ||
    !currentLocation.latitude ||
    !currentLocation.longitude
  ) {
    console.error('missing data');
    return 'missing data latitude or longitude note exists';
  }
  if (
    !check_lat_lon(coordinates.latitude, coordinates.longitude) ||
    !check_lat_lon(currentLocation.latitude, currentLocation.longitude)
  ) {
    console.error('coordinates not valid');
    return 'coordinates not valid';
  }
  //get distance between new and old coordinates from getPreciseDistance
  let distance = checkCoordinatesWithgetDistance(coordinates, currentLocation);
  //The distance is big enough update the data base
  if (distance >= 1000) {
    console.log('I write the coordinates to the database');
    console.log(coordinates, currentLocation);
    addToCollection({
      latitude: currentLocation.latitude,
      longitude: currentLocation.longitude,
    });
    return true;
  }
  //The distance is not big enough to update the data base
  if (distance < 1000) {
    console.log(`The distance ${distance} its too small`);
    return false;
  }
};
