/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  PermissionsAndroid,
  Linking,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView from 'react-native-maps';
// Function to get permission for location
const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Geolocation Permission',
        message: 'Can we access your location?',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    console.log('granted', granted);
    if (granted === 'granted') {
      console.log('You can use Geolocation');
      return true;
    } else {
      console.log('You cannot use Geolocation');
      return false;
    }
  } catch (err) {
    return false;
  }
};
const App = () => {
  // state to hold location
  const [location, setLocation] = useState({
    latitude: 37.4219927,
    longitude: -122.0840173,
    latitudeDelta: 0.0434,
    longitudeDelta: 0.0435,
  });
  // function to check permissions and get Location
  useEffect(() => {
    (async () => {
      const result = requestLocationPermission();
      result.then(res => {
        console.log('res is:', res);
        if (res) {
          Geolocation.getCurrentPosition(
            position => {
              console.log('position', position);
              setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.0434,
                longitudeDelta: 0.0435,
              });
              console.log('location in useEffect', location);
            }
            // ,error => {
            //   // See error code charts below.
            //   console.log(error.code, error.message);
            //   setLocation(false);
            // },
            // {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
          );
        }
      });
    })();
  }, []);
  console.log('location', location);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={
          location
            ? location
            : {
                latitude: 37.4219927,
                longitude: -122.0840173,
                latitudeDelta: 0.0434,
                longitudeDelta: 0.0435,
              }
        }
        showsUserLocation={true}
        followsUserLocation={true}
        onUserLocationChange={(event) => {
          setLocation({
            latitude: event.nativeEvent.coordinate.latitude,
            longitude: event.nativeEvent.coordinate.longitude,
          });
          // checkCoordinates(location, event.nativeEvent.coordinate);
        }}
      />
      {/* <MapView style={styles.map} region={location}></MapView> */}
      {/* <Text>Welcome!</Text> */}
      {/* <Text>{location.latitude}</Text> */}
      {/* <Text>Latitude: {location ? location.coords.latitude : null}</Text>
      <Text>Longitude: {location ? location.coords.longitude : null}</Text> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
export default App;
