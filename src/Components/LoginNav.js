import { Link } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { signOut } from "../services/firebase";


export default function LoginNav({userState}) {

    return (
        <AppBar position="static" className="pink darken-2">
            <Toolbar>
                <Typography style={{fontWeight: "bolder"}}>Social App</Typography>
            </Toolbar>
            <Typography>
                <ul className="right-align" style={{display: "flex", listStyle: "none", alignItems: "center"}}>
                   {userState ? (
                       <>
                       <li>Welcome, {userState.firstname}</li>
                       <li>
                           <Link style={{color: "white"}} to="/" onClick={signOut}>Logout</Link>
                       </li>
                       <li>
                           <img src={userState.avatarUrl} alt="" />
                       </li>
                       </>
                   ) : (
                       <>
                       <li style={{marginLeft: "80%"}}>
                           <Link style={{color: "white"}} to="/login">Login</Link>
                       </li>
                       <li style={{marginRight: "80%"}}>
                           <Link style={{color: "white"}} to="/signup">Signup</Link>
                       </li>
                       </>
                   )}
                </ul>
            </Typography>
        </AppBar>
    )
}