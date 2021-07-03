import React, {useState} from 'react';
import Divider from '@material-ui/core/Divider';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';




export default function Home({posts, deletePost, history}) {
 

// ************* Delete Action
const handleDelete = id => {
  deletePost(id);
  history.push('/posts/home');
}

  
// ************************************************ Show
const loading = () => {
 return (  <div className="preloader-wrapper active">
 <div className="spinner-layer spinner-red-only">
   <div className="circle-clipper left">
     <div className="circle"></div>
   </div><div className="gap-patch">
     <div className="circle"></div>
   </div><div className="circle-clipper right">
     <div className="circle"></div>
   </div>
 </div>
</div>
 );
};

// Load function
const loaded = () => {
  return posts.map((post) => (
    <ul className="collection">
      <li className="collection-item">
        {/* ************************* DELETE  */}
        <button style={{backgroundColor: "white", borderStyle: "none", color: "rgb(228, 32, 88)", marginLeft: "95%"}} onClick={() => handleDelete(post._id)} ><DeleteIcon /></button>
      {/* *********************************** */}
    <div key={post._id} className="post">
    <p className="left-align" >{post.text}</p>
    <div className="card-image center-align">
      <img src={post.imageUrl}/>
      </div>
    </div>
    </li>
    </ul>
  ));
};


return (
<div style={{marginLeft: "20%", marginTop: "10%", width: "600px"}} className="home">
  { posts ? loaded() : loading() }
  
</div>
);
};