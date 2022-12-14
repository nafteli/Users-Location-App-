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

if (!firebase.apps.length) {
  console.log('firebase connect');
  firebase.initializeApp(firebaseConfig);
}

export {firebase};
