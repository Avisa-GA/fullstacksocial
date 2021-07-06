import React, {useState, useEffect} from 'react';
import Divider from '@material-ui/core/Divider';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Input } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import { useHistory } from "react-router-dom";
import { getPosts, createPost, uploadPostImage, deletePost  } from '../services/post-service';



export default function Home({userState}) {

// ******************* Create Post

const [newPost, setNewPost] = useState(newForm());
const [posts, setPosts] = useState(null);

const history = useHistory();

function newForm() {
  return {
    text: "",
    imageUrl: null
  }
}

// ******************** Get all posts
async function getAllPosts(uid) {
  setPosts(await getPosts(uid));
}
// ******************** Change postState
const handleChange = (e) => {
  setNewPost((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      errors: ""
  }))
};

// ****************** Delete Post
async function handleDelete(id) {
  const token = await userState.getIdToken();
  await deletePost(id, token);
  getAllPosts(userState.uid);
  history.push("/");
}

// ******************* Submit Post (Create a new post)
async function handleSubmit(e) {
     e.preventDefault();
     const {text, imageUrl} = newPost;
     const token = await userState.getIdToken();
     try {

      if(!userState) {
        alert("must be logged in")
        return;
      }

      let imageData;

      if (newPost.imageUrl) {
        const data = new FormData();
        data.append("file", newPost.image);
        data.append("upload_preset", "ml_default");
        imageData = await uploadPostImage(data);
      }

      await createPost({
         text,
         imageUrl: imageData ? imageData.data.secure_url : ""
      },
      token
      )

      setNewPost(newForm());
      getAllPosts(userState.uid);
      history.push("/");

     } catch ({message}) {
       setNewPost({ ...newForm(), errors: message })
     }
};

// ************************ Image upload
function handleImageFile(e) {
  const file = e.target.files[0];
  setNewPost((prevState) => ({ ...prevState, imageUrl: file}));
}

// ************************ Load data useEffect
useEffect(() => {
  if(userState) {
    getAllPosts(userState.uid);
  } else {
    getAllPosts();
  }
}, [userState]);

// ************************************************ Show
const loading = () => {
return ( <div style={{marginRight: "5%"}} className="preloader-wrapper active">
  <div className="spinner-layer spinner-red-only">
    <div className="circle-clipper left">
      <div className="circle"></div>
    </div>
    <div className="gap-patch">
      <div className="circle"></div>
    </div>
    <div className="circle-clipper right">
      <div className="circle"></div>
    </div>
  </div>
</div>
);
};

// Load function
const loaded = () => {
return posts.map((post, index) => (
<ul key={index} className="collection">
  <li className="collection-item avatar">
    {/* ********************** AVATAR CONTENT */}
    <img src={userState.avatarUrl} alert="" className="circle" />
    {/* ----------------------- ADD USER NAME */}
    <span style={{marginRight: "80%", fontSize: 10, fontWeight: "bolder", color: "rgb(9, 107, 177)"}}
      className="title">{userState.firstName}</span>
    {/* ************************* DELETE */}
    <button style={{backgroundColor: "white", borderStyle: "none", color: "rgb(236, 144, 144)", marginLeft: "95%"}}
      onClick={()=> handleDelete(post._id)} >
      <DeleteIcon /></button>
    {/* *********************************** */}
    <div key={post._id} className="post">
      <p style={{fontSize: 12}} className="left-align">{post.text}</p>
      <div className="card-image center-align">
        <img src={post.imageUrl} alt="" />
      </div>
    </div>
  </li>
</ul>
));
};


return (
<div style={{marginLeft: "20%", marginTop: "10%", width: "600px"}} className="home">
  {/* ******************************* CREATE POST */}
  <div className="card-action">
    <form onSubmit={handleSubmit}>
      <input type="text" name="text" placeholder="What's happening?" value={newPost.text} onChange={handleChange} />
      {/* ************ Add image here */}
      <div className="file-field input-field">
        <div className="btn pink darken-2">
          <span style={{fontSize: 24}}>
            <ImageIcon /></span>
          <input type="file" name="imageUrl" alt="" onChange={handleImageFile} />
        </div>
        <div className="file-path-wrapper">
          <input type="text" className="file-path validate" />
        </div>
      </div>
      <button type="submit" style={{marginLeft: "88%"}} className="btn white-text pink darken-2">post</button>
    </form>
  </div>
  <br />
  <br />
  <br />
  {/* {loaded()} */}
  { posts ? loaded() : loading() }

</div>
);
};