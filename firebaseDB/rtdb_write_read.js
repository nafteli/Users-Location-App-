import {ref, set, onValue, remove} from 'firebase/database';
import {database} from './Realtime.db.config';
import {getUniqueId, getDeviceId} from 'react-native-device-info';

export const getUuid = async () => {
  let uuid = await getUniqueId()._j;
  return uuid;
};

export const writeUserData = async (coordinates, imageUrl) => {
  let name = getDeviceId();
  let userId = await getUuid();
  try {
    if (!userId || userId == null || userId === undefined) {
      let mesgg = 'userId can not be empty';
      console.log(mesgg, userId);
      return mesgg;
    }
    set(ref(database, 'users/' + userId), {
      coordinates: coordinates,
      time: new Date().toLocaleString(),
      title: name,
      // profile_picture: imageUrl,
    })
      .then(console.log(name))
      .catch(err => {
        console.log(err);
      });
  } catch (e) {
    console.log(e);
  }
};

export const readUsers = () => {
  let data;
  const readUsersRef = ref(database, 'users/');
  onValue(readUsersRef, snapshot => {
    data = snapshot.val();
  });
  return data;
};

export const removeUser = async () => {
  let userId = await getUuid();
  // if (readUsers().userId === undefined || readUsers().userId === null) {
  //   let message = 'this user is deleted';
  //   console.log(
  //     userId !== null || readUsers().userId === undefined,
  //     readUsers().userId,
  //   );
  //   return; //message;
  // }
  console.log(`Removing ${userId}`);
  let userToDelete = remove(ref(database, 'users/' + userId));
  console.log(userToDelete);
  // userToDelete.remove();
  // return userToDelete;
};
