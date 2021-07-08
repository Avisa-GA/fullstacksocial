import React, {useContext} from "react";
import { AuthContext } from "../services/contex";
import { Link } from "react-router-dom";
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import {signOut} from '../services/firebase';
import { useHistory } from "react-router-dom";


const useStyles = makeStyles(theme => ({
menuButton: {
marginRight: theme.spacing(2),
},
title: {
flexGrow: 1,
},
}));

export default function Nav(props) {

const { userState, setUserState } = useContext(AuthContext);
const classes = useStyles();
const history = useHistory();


async function handleSignout() {
  await signOut();
  // history.push("/login")
}


return (
<AppBar position="static" className="pink darken-2">
  <Toolbar>
    <IconButton edge="start" color="inherit" aria-label="menu" className={classes.menuButton}>
      <MenuBookIcon style={{fontSize: "50px", color: "rgb(251, 224, 233)"}} />
    </IconButton>
    <Typography className={classes.title}>
      <Link to="/">
      <HomeIcon style={{color: "white"}} />
      </Link>
    </Typography>
    <Typography className={classes.title}>
      <Link to="/search">
      <SearchIcon style={{color: "white"}} />
      </Link>
    </Typography>
    <Typography className={classes.title}>
      <Link to="/profile">
      <PersonIcon style={{color: "white"}} />
      </Link>
    </Typography>
    <Typography style={{marginRight: "1%"}} className={classes.title}>
                <ul className="right-align" style={{display: "flex", listStyle: "none", alignItems: "center"}}>
                   {userState ? (
                       <>
                       <li>Welcome, {userState.firstName}</li>
                       <li style={{color: "white", cursor: "pointer"}} onClick={handleSignout}>
                       <Link style={{color: "white", fontWeight: "bold"}} to="/login">Logout </Link>
                       </li>
                       <br />
                       <br />
                       <li>
                           <img style={{width: 38, height: 38, borderRadius: "50%"}} src={userState.avatarUrl} alt="" />
                       </li>
                       </>  
                   ) : (
                       <>
                       <li style={{marginLeft: "80%"}}>
                           <Link style={{color: "white", fontWeight: "bold"}} to="/login">Login </Link>
                         
                       </li>
                       <br />
                       <br />
                       <li style={{marginRight: "80%"}}>
                           <Link style={{color: "white", fontWeight: "bold"}} to="/signup"> Signup</Link>
                       </li>
                       </>
                   )}
                </ul>
    </Typography>
  </Toolbar>

</AppBar>
);
};