import axios from 'axios';
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dzsyqjq3i/image/upload"
const POST_URL = "https://social-app-end.herokuapp.com/post"


async function getPosts() {
    // const url = uid ? POST_URL + '?uid=' + uid : POST_URL;
    const response = await fetch(POST_URL);
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
    return fetch(POST_URL, {
        method: "POST",
        headers: {
            "Content-Type": "Application/json",
            "authorization": "bearer " + token
        },
        body: JSON.stringify(post)
    })
}

async function deletePost(id, token) {
    return fetch(POST_URL + "/" + id, {
        method: "DELETE",
        headers: {
            "authorization": "bearer " + token
        }
    });
}

async function addLike(id, token) {
    return fetch(POST_URL + "/" + id + "/like", {
        method: "POST",
        headers: {
            "authorization": "bearer " + token
        }
    });
}

async function addDislike(id, token) {
    return fetch(POST_URL + "/" + id + "/dislike", {
        method: "POST",
        headers: {
            "authorization": "bearer " + token
        }
    });
}

async function addComment(id, token) {
    return fetch(POST_URL + "/" + id + "/comment", {
        method: "POST",
        headers: {
            "authorization": "bearer " + token
        }
    });
}

export {getPosts, createPost, deletePost, uploadPostImage, addLike, addDislike, addComment};