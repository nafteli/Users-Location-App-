import React, {useState, useEffect} from 'react';
import Geolocation from 'react-native-geolocation-service';
import MapView from 'react-native-maps';
import {StyleSheet, View, PermissionsAndroid, AppState} from 'react-native';
// import {addToCollection} from './firebaseDB/add';
import {checkCoordinates} from './checkCoordinates';
import {showMarkersOnMap} from './markers';
import {removeUser, writeUserData} from './firebaseDB/rtdb_write_read';

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
    console.info('granted', granted);
    if (granted === 'granted') {
      console.info('You can use Geolocation');
      return true;
    } else {
      console.info('You cannot use Geolocation');
      return false;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
};

const App = () => {
  // state to hold location
  const [location, setLocation] = useState({
    latitude: 32.09266,
    longitude: 34.8379585,
    latitudeDelta: 0.0434,
    longitudeDelta: 0.0435,
  });
  const [userMarker, setuserMarker] = useState({
    latitude: 32.09266,
    longitude: 34.8379585,
  });
  const [appState, setAppState] = useState(AppState.currentState);
  useEffect(() => {
    (async () => {
      const result = requestLocationPermission();
      result.then(res => {
        console.info('res is:', res);
        if (res) {
          Geolocation.getCurrentPosition(
            async position => {
              setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.0434,
                longitudeDelta: 0.0435,
              });
              setuserMarker({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
              writeUserData(userMarker);
              // addToCollection({
              //   latitude: position.coords.latitude,
              //   longitude: position.coords.longitude,
              // });
              // console.log('document id', id);
            },
            error => {
              // See error code charts below.
              console.log(error.code, error.message);
              // setLocation(false);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
          );
        }
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  AppState.addEventListener('change', nextAppState => {
    if (appState.match(/inactive|background/) && nextAppState !== 'active') {
      console.log('App has come to the foreground!', nextAppState);
      removeUser();
    }
    if (nextAppState === 'active') {
      // writeUserData(userMarker);
      checkCoordinates(userMarker, location, setuserMarker);
    }
    setAppState(nextAppState);
  });
  // AppState.addEventListener('change', nextAppState => {
  //   if (nextAppState !== 'active') {
  //     console.log(`i can remove ${nextAppState}`);
  //   }
  // });
  // console.info('location', location, new Date().toLocaleString());

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
        followsUserLocation={true} //Apple Maps only.
        userLocationPriority={'low'} //android maps only.
        userLocationUpdateInterval={5000} //folllwo user location updates every 5 seconds
        showsCompass={true}
        loadingEnabled={true}
        zoomEnabled={true}
        onUserLocationChange={event => {
          // console.log('onUserLocationChange', event.nativeEvent.coordinate);
          setLocation({
            latitude: event.nativeEvent.coordinate.latitude,
            longitude: event.nativeEvent.coordinate.longitude,
            latitudeDelta: 0.009,
            longitudeDelta: 0.009,
          });
          checkCoordinates(
            userMarker,
            event.nativeEvent.coordinate,
            setuserMarker,
          );
        }}
        onPress={Userlocation => {
          console.info(
            'press on map in coordinates',
            Userlocation.nativeEvent.coordinate,
          );
        }}>
        {showMarkersOnMap()}
      </MapView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  marker: {flex: 1},
  map: {
    width: '100%',
    height: '100%',
  },
});
export default App;
