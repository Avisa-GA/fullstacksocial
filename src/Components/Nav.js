import React from "react";
import { Link } from "react-router-dom";
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import { func } from "prop-types";

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Nav() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          className={classes.menuButton}
        >
          🚀
        </IconButton>
        <Typography className={classes.title}>
        <Link to="/posts/home">
         <HomeIcon />
         </Link>
        </Typography >
        <Typography className={classes.title}>
        <Link to="/posts/search">
          <SearchIcon />
           </Link>
</Typography>
<Typography className={classes.title}>
<Link to="/posts/profile">
          <PersonIcon />
           </Link>
</Typography>
<Typography className={classes.title}>
<Link to="/" >
         <ExitToAppIcon />
           </Link>
</Typography>
      </Toolbar>
      
    </AppBar>
  );
};



