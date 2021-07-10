import axios from 'axios';
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dzsyqjq3i/image/upload"
const USER_URL = "https://social-app-end.herokuapp.com/api/users"


async function allUsers(uid) {
  //  const url = uid ? URL + "?uid=" + uid : URL;
   const response = await fetch(USER_URL);
   return response.json();
}
// *************************** Followers
async function allFolowers(user) {
  const token = await user.getIdToken();
    const response = await fetch(USER_URL + "/" + user._id + "followers", {
      method: "GET",
      headers: {
        "Content-Type": "Application/json",
        "authorization": "bearer " + token
      }
    });
    return response.json();
}

async function follow(id, token) {
  return fetch(USER_URL + "/" + id + "/follow", {
      method: "POST",
      headers: {
          "authorization": "bearer " + token
      }
  });
}

async function unfollow(id, token) {
  return fetch(USER_URL + "/" + id + "/unfollow", {
      method: "POST",
      headers: {
          "authorization": "bearer " + token
      }
  });
}
// *********************************

async function getLoggedInUser(user) {
    const token = await user.getIdToken();
    return axios({
      method: "GET",
      url: USER_URL + "/login",
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
      url: USER_URL + "/signup",
      method: "POST",
      headers: {
        authorization: "bearer " + token
      },
      data
    });
  }
  
  export { getLoggedInUser, uploadAvatar, createUser, allUsers, follow, unfollow, allFolowers };
  