import {firebase} from './db.config';

export const addToCollection = async locations => {
  let documentID;
  const time = firebase.firestore.FieldValue.serverTimestamp();
  const addToCollectionByName = firebase.firestore().collection('coordinates');

  let locationWithTime = {
    coordinates: locations,
    createdAt: time,
  };

  console.log(
    `add ${locations.latitude} ${locations.longitude} to db in collection coordinates`,
  );
  await addToCollectionByName
    .add(locationWithTime)
    .then(ref => {
      console.log(ref.id, 'ref.id');
      documentID = ref.id;
    })
    .catch(error => {
      alert(error);
    });
  console.log(
    'documentID',
    documentID,
    !documentID,
    new Date().toLocaleString(),
  );
  return documentID;
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
