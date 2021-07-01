import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Divider from '@material-ui/core/Divider';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import EditIcon from '@material-ui/icons/Edit';

function rand() {
return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
const top = 50 + rand();
const left = 50 + rand();

return {
top: `${top}%`,
left: `${left}%`,
transform: `translate(-${top}%, -${left}%)`,
};
}

const useStyles = makeStyles((theme) => ({
paper: {
position: 'absolute',
width: 425,
backgroundColor: theme.palette.background.paper,
border: '2px solid #000',
boxShadow: theme.shadows[5],
padding: theme.spacing(2, 4, 3),
},
}));

export default function Home({posts}) {
  // ************************* Modal
const classes = useStyles();
// getModalStyle is not a pure function, we roll the style only on the first render
const [modalStyle] = React.useState(getModalStyle);
const [open, setOpen] = React.useState(false);

const handleOpen = () => {
setOpen(true);
};

const handleClose = () => {
setOpen(false);
};

const deleteBody = (
<div style={modalStyle} className={classes.paper}>
  
<div style={{width: "700px", marginTop: "7%", marginLeft: "1%"}} className="row">
    <div className="col s12 m6">
      <div className="card pink darken-4">
        <div className="card-content white-text">
          <p>Are you sure you want to delete?</p>
        </div>
        <div className="card-action">
        <a href="#">Cancel</a>
          <a href="#">Delete</a>
        </div>
      </div>
    </div>
  </div>
  
  <Modal />
</div>
);
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
    <div key={post._id} className="post">
    <p className="left-align">{post.text}</p>
    <div className="card-image center-align">
      <img src={post.imageUrl}/>
      </div>
    </div>
    </li>
    </ul>
  ));
};


return (
<div style={{marginLeft: "20%", marginTop: "10%"}} className="home">
  { posts ? loaded() : loading() }
  
</div>
);
};