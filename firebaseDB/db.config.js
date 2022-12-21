import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD3VcHXM_nT-A9KQ0U5SoRqeDIDKWDAO_U',
  authDomain: 'durable-timing-370613.firebaseapp.com',
  projectId: 'durable-timing-370613',
  storageBucket: 'durable-timing-370613.appspot.com',
  messagingSenderId: '1027463900880',
  appId: '1:1027463900880:web:3f8f541724f8d7837038d5',
  measurementId: 'G-KJ17D8DQBN',
};

// const firebaseConfig = {
//   apiKey: 'AIzaSyBtgAKIb4eSjNRJL90hmNVeAUJL3R8lcUo',

//   authDomain: 'naftaliproject.firebaseapp.com',

//   projectId: 'naftaliproject',

//   storageBucket: 'naftaliproject.appspot.com',

//   messagingSenderId: '184408479051',

//   appId: '1:184408479051:web:f7957e78763de2153b84ce',

//   measurementId: 'G-FXZSK6EZFN',
// };

console.log('firebase connect', firebase.apps.length);
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
firebase.auth();
firebase
  .firestore()
  .settings({experimentalForceLongPolling: true, merge: true});

export {firebase};
