import axios from 'axios';
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dzsyqjq3i/image/upload"
const URL = "https://social-full-backend.herokuapp.com/post"


async function getPosts(uid) {
    const url = uid ? URL + '?uid=' + uid : URL;
    const response = await fetch(url);
    return response.json();
};

function uploadPostImage(data) {
    return axios({
      url: CLOUDINARY_URL,
      method: "POST",
      data
    });
  }


async function createPost(post, token) {
    return fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "Application/json",
            "authorization": "bearer " + token
        },
        body: JSON.stringify(post)
    })
}

async function deletePost(id, token) {
    return fetch(URL + "/" + id, {
        method: "DELETE",
        headers: {
            "authorization": "bearer " + token
        }
    });
}

async function addLike(id, token) {
    return fetch(URL + "/" + id + "/like", {
        method: "POST",
        headers: {
            "authorization": "bearer " + token
        }
    });
}

async function addDislike(id, token) {
    return fetch(URL + "/" + id + "/dislike", {
        method: "POST",
        headers: {
            "authorization": "bearer " + token
        }
    });
}

export {getPosts, createPost, deletePost, uploadPostImage, addLike, addDislike};