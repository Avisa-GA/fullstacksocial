import React, {useState} from 'react';
import Divider from '@material-ui/core/Divider';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Input } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import Axios from 'axios';



export default function Home({posts, deletePost, history, createPost}) {

// ******************* Create Post
const [newPost, setNewPost] = useState({
text: "",
imageUrl: ""
});

const [imageSelected, setImageSelected] = useState("");

// HandleChange function for form
const handleChange = (event) => {
 
setNewPost({ ...newPost, [event.target.name]: event.target.value});
};

// ***************** Upload Image
const uploadImage = () => {
   const formData = new FormData();
   formData.append("file", imageSelected);
   formData.append("upload_preset", "ljxjnqss");
   Axios.post("https://api.cloudinary.com/v1_1/dzsyqjq3i/image/upload", formData);
};




// Handle submit function for form
const handleSubmit = (event) => {
event.preventDefault();
createPost(newPost);
setNewPost({
text: "",
imageUrl: ""
})
};

// ************* Delete Action
const handleDelete = id => {
deletePost(id);
history.push('/posts/home');
}


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
    <img src="" className="circle" />
    {/* ----------------------- ADD USER NAME */}
    <span style={{marginRight: "80%", fontSize: 10, fontWeight: "bolder", color: "rgb(9, 107, 177)"}}
      className="title"></span>
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
          <input type="file" name="imageUrl" alt="" value={newPost.imageUrl} onChange={(e) => setImageSelected(e.target.files[0])} />
        </div>
        <div className="file-path-wrapper">
          <input type="text" className="file-path validate" />
        </div>
      </div>
      <button onClick={uploadImage} type="submit" style={{marginLeft: "88%"}} className="btn white-text pink darken-2">post</button>
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