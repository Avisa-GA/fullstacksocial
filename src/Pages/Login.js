import React from "react";
import { Link } from "react-router-dom";
import {login, logout} from '../services/firebase';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


export default function Login(props) {
return (

<div className="loginPage">
    <AppBar position="static" className="pink darken-2">
        <Toolbar>
            <Typography>
                Welcome to Social Web
            </Typography>
        </Toolbar>
    </AppBar>
       {
           props.user ?
           
       <button onClick={logout} style={{marginTop: "5%", width: 200, height: 200, borderRadius: "50%", marginRight: "2%", fontSize:35, cursor: "pointer"}} className="waves-effect waves-light btn pink darken-2"><Link style={{color: "white"}} to="/posts">Logout</Link></button>
     
       :
       <button onClick={login} style={{marginTop: "5%", width: 200, height: 200, borderRadius: "50%", marginRight: "2%", fontSize:35, cursor: "pointer"}} className="waves-effect waves-light btn"><Link style={{color: "white"}} to="/posts">Login</Link></button>
       }
</div>

)
}