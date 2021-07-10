import React, {useState, useEffect, useContext} from 'react';
import {AuthContext} from "../services/contex";
import Divider from '@material-ui/core/Divider';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import DeleteIcon from '@material-ui/icons/Delete';
import ImageIcon from '@material-ui/icons/Image';
import { useHistory } from "react-router-dom";
import CommnetAdd from './CommentAdd';
import { getPosts, createPost, uploadPostImage, deletePost, addLike, addDislike, addComment } from
'../services/post-service';
import { auth } from '../services/firebase';


export default function Home({userState}) {


// ******************* Create Post

const [newPost, setNewPost] = useState(newForm());
const [posts, setPosts] = useState([]);
const [isLoading, setIsLoading] = useState(false);


const history = useHistory();

function newForm() {
return {
text: "",
imageUrl: null,
}
}

// ******************** Get all posts
async function getAllPosts() {
  if(isLoading) {
setPosts(await getPosts());
setIsLoading(true);
  } else {
    setIsLoading(false);
  }
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
const token = await auth.currentUser.getIdToken()
await deletePost(id, token);
getAllPosts();
history.push("/");
}

// ****************** handle Like
async function handleLike(id) {
const token = await auth.currentUser.getIdToken();
const post = posts.find(p => p._id === id);
const hasLiked = post.likes.includes(userState._id);
if(hasLiked) {
await addDislike(id, token);
} else {
await addLike(id, token);
}
getAllPosts(); // Refresh the page
history.push("/");
}

// ************************ handleComment
async function handleSubmitComment(e) {
  e.preventDefault()
  const token = await auth.currentUser.getIdToken();
  await addComment(userState._id, token);
  getAllPosts('/');
  history.push('/');
}


// ******************* Submit Post (Create a new post)
async function handleSubmit(e) {
e.preventDefault();
const {text} = newPost;
const token = await auth.currentUser.getIdToken()
try {

if(!userState) {
alert("must be logged in")
return;
}

let imageData;

if (newPost.imageUrl) {
const data = new FormData();
data.append("file", newPost.imageUrl);
data.append("upload_preset", "ljxjnqss");
imageData = await uploadPostImage(data);
}

await createPost({
text,
imageUrl: imageData ? imageData.data.secure_url : ""
},
token
)

setNewPost(newForm());
getAllPosts();
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
getAllPosts();
}, []);

console.log(posts);

// *********************** CurrentUser

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
  if(isLoading) {
    return loading();
  } 
return posts.map((post, index) => (
<ul key={index} className="collection">
  <li className="collection-item avatar">
    {/* ********************** AVATAR CONTENT */}
    <img src={post.createdBy.avatarUrl} alt="" className="circle" />
    {/* ----------------------- ADD USER NAME */}
    <span
      style={{marginRight: "100%", fontSize: 12, fontWeight: "bolder", color: "rgb(9, 107, 177)", paddingBottom: "10%"}}
      className="title">{post.createdBy.firstName}</span>
    {/* ************************* DELETE */}
    { post.createdBy._id === userState._id ? <button
      style={{backgroundColor: "white", borderStyle: "none", color: "rgb(236, 144, 144)", marginLeft: "95%"}}
      onClick={()=> handleDelete(post._id)} >
      <DeleteIcon /></button> : <></> }

    {/* *********************************** */}
    <Divider />
    <div key={post._id} className="post">
      <p style={{fontSize: 12}} className="left-align">{post.text}</p>
      <div className="card-image center-align">
        <img style={{width: 400,height: 300, borderRadius: 15}} src={post.imageUrl} alt="" />
      </div>
    </div>
    {/* **************************** LIKE */}
    <div style={{display: "flex"}} className="comments-likes">
      {post.createdBy._id === userState._id ? <></>
      :
      <div>
        <button
          style={{marginRight: "80%", borderStyle: "none", backgroundColor: "white", color: post.likes.includes(userState._id) ? "red" : "lightgray"}}
          onClick={()=> handleLike(post._id)}>
          <FavoriteIcon /></button>

        {/* *************************** COMMENT */}
        <CommnetAdd />
      </div>
      }
    </div>
    {/* **************************** */}
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
          <input type="file" name="imageUrl" onChange={handleImageFile} />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <button type="submit" style={{marginLeft: "88%"}} className="btn white-text pink darken-2">post</button>
    </form>
  </div>
  <br />
  <br />
  <br />

  { posts && userState ? loaded() : loading() }
</div>
);
};