import {initializeApp} from 'firebase/app';
import {getDatabase} from 'firebase/database';
// import firebaseConfig from './db.config';

const firebaseRTConfig = {
  databaseURL:
    'https://durable-timing-370613-default-rtdb.europe-west1.firebasedatabase.app/',
};

// Initialize Firebase
const app = initializeApp(firebaseRTConfig);

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);
