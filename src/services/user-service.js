import axios from 'axios';
import { signUp, login, database, signOut } from "./firebase";
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dzsyqjq3i/image/upload"
const USER_URL = "https://social-app-end.herokuapp.com/api/users"


function uploadAvatar(data) {
  return axios({
    url: CLOUDINARY_URL,
    method: "POST",
    data
  });
}
  
function createUser({ firstName, lastName, email, password, image }) {
  return new Promise(async (resolve, reject) => {
    try {
      const { user } = await signUp(email, password);
      signOut();

      let avatar;

      if (image) {
        const form = new FormData();
        form.append("file", image);
        form.append("upload_preset", "ljxjnqss");
        avatar = await uploadAvatar(form)
      }

      await user.updateProfile({
        displayName: `${firstName} ${lastName}`,
        photoURL: avatar ? avatar.data.secure_url : ''
      });

      await login(email, password);

      await database.ref(`/users/${user.uid}`).set({
        firstName,
        lastName,
        email,
        avatarUrl: avatar ? avatar.data.secure_url : ''
      });

      resolve(true);

    } catch (error) {
      reject(error)
    }
  })
} 

function loginUser(email, password) {
  return new Promise(async (resolve, reject) => {
    try {
      const { user } = await login(email, password);
      resolve(user)
    } catch (error) {
      reject(error);
    }
  })
}

export { createUser, loginUser };