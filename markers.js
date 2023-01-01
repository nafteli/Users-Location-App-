import React from 'react';
import {Marker} from 'react-native-maps';
import {check_lat_lon} from './checkCoordinates';
import {readUsers} from './firebaseDB/rtdb_write_read';

// const markers = {
//   user1: {
//     id: 1,
//     titel: 'test1',
//     coordinates: {latitude: 32.0926714, longitude: 34.8382826},
//   },
//   user2: {
//     id: 2,
//     title: 'test2',
//     coordinates: {latitude: 32.08266, longitude: 34.8479585},
//   },
//   user3: {
//     id: 3,
//     title: 'test3',
//     coordinates: {latitude: 32.09266, longitude: 34.8379585},
//   },
// };

// Function to get markers from object
export const showMarkersOnMap = () => {
  let markerUser = readUsers();
  try {
    return Object.entries(markerUser).map((marker, i) => {
      return (
        <Marker
          key={i}
          coordinate={
            marker[1].coordinates
              ? marker[1].coordinates
              : {latitude: 32.09266, longitudes: 34.8379585}
          }
          title={marker ? marker[1].title : 'Anonymous'}
        />
      );
    });
  } catch (e) {
    console.log('error', e);
  }
};

// const test = [
//   {
//     id: 1,
//     titel: 'test1',
//     coordinates: {latitude: 32.0926714, longitude: 34.8382826},
//   },
//   {
//     id: 2,
//     title: 'test2',
//     coordinates: {latitude: 32.08266, longitude: 34.8479585},
//   },
//   {
//     id: 3,
//     title: 'test3',
//     coordinates: {latitude: 32.09266, longitude: 34.8379585},
//   },
// ];

// export const addMarkersFromDB = data => {
//   test.push(data);
//   console.log(test);
// };

// export const addMarker = marker => {
//   if (!marker) {
//     let message = 'marker not found';
//     console.error(message);
//     return message;
//   }
//   if (!marker.title || !marker.coordinates) {
//     let message = 'title or coordinates not found';
//     console.error(message);
//     return message;
//   }
//   if (
//     !check_lat_lon(marker.coordinates.latitude, marker.coordinates.longitude)
//   ) {
//     let message = 'coordinates not valid';
//     console.error(message);
//     return message;
//   }
//   // const markersInDb = readUsers();
//   // console.log('markersInDb', markersInDb, Object.keys(markersInDb)[0]);
//   // markers[Object.keys(markersInDb)[0]] = Object.values(markersInDb);
//   test.push(readUsers);
// };

// // Function to get markers from array
// export const requestCoordinates = () => {
//   showMarkersOnMap();
//   return test.map((marker, i) => (
//     <Marker
//       key={i}
//       coordinate={
//         marker
//           ? marker.coordinates
//           : {latitude: 32.09266, longitudes: 34.8379585}
//       }
//       title={marker.title}
//     />
//   ));
// };
