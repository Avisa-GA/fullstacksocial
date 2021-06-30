import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

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
width: 400,
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
  <h2 id="simple-modal-title">Text in a modal</h2>
  <p id="simple-modal-description">
    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
  </p>
  <Modal />
</div>
);


return (
<div style={{marginLeft: "20%", marginTop: "10%"}} className="card">
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
        <span style={{marginRight: "50%"}} className="title">Hiker</span>
        <span className="date">6 days ago</span>
      </section>
    </li>
  </ul>

</div>
);
};