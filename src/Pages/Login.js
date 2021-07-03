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
           
           <Link style={{color: "white"}} to="/"><button onClick={logout} style={{marginTop: "5%", width: 200, height: 200, borderRadius: "50%", marginRight: "2%", fontSize:35, cursor: "pointer"}} className="waves-effect waves-light btn pink darken-2">Logout</button></Link>
     
       :
     
       <Link style={{color: "white"}} to="/posts/home"><button onClick={login} style={{marginTop: "5%", width: 200, height: 200, borderRadius: "50%", marginRight: "2%", fontSize:35, cursor: "pointer"}} className="waves-effect waves-light btn">Login</button></Link>
     
       }
</div>

)
}