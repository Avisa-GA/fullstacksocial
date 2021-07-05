import React from "react";
import { Link } from "react-router-dom";
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuBookIcon from '@material-ui/icons/MenuBook';

import { signOut } from "../services/firebase";
const useStyles = makeStyles(theme => ({
menuButton: {
marginRight: theme.spacing(2),
},
title: {
flexGrow: 1,
},
}));

export default function Nav(props) {
const classes = useStyles();

function handleSignout() {
signOut();
}

return (
<AppBar position="static" className="pink darken-2">
  <Toolbar>
    <IconButton edge="start" color="inherit" aria-label="menu" className={classes.menuButton}>
      <MenuBookIcon style={{fontSize: "50px", color: "rgb(251, 224, 233)"}} />
    </IconButton>
    <Typography className={classes.title}>
      <Link to="/posts/home">
      <HomeIcon style={{color: "white"}} />
      </Link>
    </Typography>
    <Typography className={classes.title}>
      <Link to="/posts/search">
      <SearchIcon style={{color: "white"}} />
      </Link>
    </Typography>
    <Typography className={classes.title}>
      <Link to="/posts/profile">
      <PersonIcon style={{color: "white"}} />
      </Link>
    </Typography>
    <Typography className={classes.title}>
      <Link to="/">
      <button onClick={handleSignout} style={{borderStyle: "none", backgroundColor: "rgb(185, 26, 80)"}}>
        <ExitToAppIcon style={{color: "white"}} /></button>
      </Link>
    </Typography>
  </Toolbar>

</AppBar>
);
};