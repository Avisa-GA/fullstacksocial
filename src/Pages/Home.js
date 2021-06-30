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

export default function Home() {
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

const body = (
<div style={modalStyle} className={classes.paper}>
  
<div style={{width: "700px", marginTop: "7%", marginLeft: "1%"}} class="row">
    <div class="col s12 m6">
      <div class="card pink darken-4">
        <div class="card-content white-text">
          <p>Are you sure you want to delete?</p>
        </div>
        <div class="card-action">
        <a href="#">Cancel</a>
          <a href="#">Delete</a>
        </div>
      </div>
    </div>
  </div>
  
  <Modal />
</div>
);


return (
<div style={{marginLeft: "20%", marginTop: "10%"}} className="home-card">
  <div style={{height: "60px"}} className="card">
    <button className="center-align" style={{borderStyle: "none", backgroundColor: "white", marginTop: "2%", fontWeight: "bolder", color: "gray"}}><EditIcon/> Create Post</button>
  </div>
  <ul className="collection">
    <li className="collection-item avatar">
      <div>
        <button style={{borderStyle: "none", backgroundColor: "white", color: "lightgray", marginLeft: "95%"}} type="button" onClick={handleOpen}>
        <HighlightOffIcon />
        </button>
        <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description">
          {body}
        </Modal>
      </div>
      <img src="" alt="" className="circle" style={{backgroundColor: "red"}} />
      <section style={{display:"grid", justifyContent: "left"}} className="headline">
        <span style={{marginRight: "50%", fontWeight: "bold"}} className="title">Hiker</span>
        <span className="date">6 days ago</span>
      </section>
      <br />
      <Divider />
      <br />
      <section className="left-align">
        <p>default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
        <img src="https://i.imgur.com/TV17EgP.jpg" title="source: imgur.com" style={{width: "600px", height: "400px", marginTop: "2%"}}/>
      </section>
      <form className="left-align" style={{height: "25px"}}>
          <button style={{borderStyle: "none", backgroundColor: "white", color: "lightgray"}}><FavoriteIcon /></button>
          <button style={{borderStyle: "none", backgroundColor: "white", color: "lightgray"}}><CommentIcon /></button>
      </form>
    </li>
  </ul>

</div>
);
};