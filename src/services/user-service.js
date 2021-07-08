import axios from 'axios';
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dzsyqjq3i/image/upload"
const URL = "https://social-full-backend.herokuapp.com/api/users"


async function allUsers(uid) {
  //  const url = uid ? URL + "?uid=" + uid : URL;
   const response = await fetch(URL);
   return response.json();
}

async function getLoggedInUser(user) {
    const token = await user.getIdToken();
    return axios({
      method: "GET",
      url: URL + "/login",
      headers: {
        authorization: "bearer " + token
      }
    });
  }
  
  function uploadAvatar(data) {
    return axios({
      url: CLOUDINARY_URL,
      method: "POST",
      data
    });
  }
  
  function createUser(data, token) {
    return axios({
      url: URL + "/signup",
      method: "POST",
      headers: {
        authorization: "bearer " + token
      },
      data
    });
  }
  
  export { getLoggedInUser, uploadAvatar, createUser, allUsers };
  