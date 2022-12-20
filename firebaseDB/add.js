import {firebase} from './db.config';

// eslint-disable-next-line prettier/prettier
export const addToCollection = async locations => {
  let documentID;
  const time = firebase.firestore.FieldValue.serverTimestamp();
  const addToCollectionByName = firebase.firestore().collection('coordinates');

  let locationWithTime = {
    coordinates: locations,
    createdAt: time,
  };

  console.log('add coordinates to db in collection coordinates');
  await addToCollectionByName
    .add(locationWithTime)
    .then(ref => {
      // console.log(ref.id, 'ref.id');
      documentID = ref.id;
    })
    .catch(error => {
      console.log(error);
      alert(error);
      return false;
    });
  // console.log('documentID', documentID, new Date().toLocaleString());
  return documentID && true;
};

// export const updateLocation = (location, documentId) => {
//     const writeToDocument = firebase.firestore().collection('coordinates').doc(`${documentId}`);
//     writeToDocument.update(location)
// }

// export const getUser = async () => {
//     const addToCollectionByName = firebase.firestore().collection('coordinates').onSnapshot((snupshut) => {
//         const data = snupshut.docs.map((doc) => ({
//             id: doc.id,
//             ...doc.data(),
//         }))
//         console.log("All data in 'coordinates' collection", data);
//     })
// }
