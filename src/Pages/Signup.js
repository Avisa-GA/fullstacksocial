import React, {useState} from 'react';
import {Link} from "react-router-dom";

function Signup(props) {

const [details, setDetails] = useState({name: "", email: "", password: ""});



return (

    <div className="signup">
    <div style={{padding: "20%"}} className="card">
    <h6 style={{fontWeight: "bold", marginBottom: "25%"}}>Create New Account</h6>
    <form>
        <div className="firstname">
        <input style={{fontSize: "12px"}} type="text" name="firstname" placeholder="firstname" />
        </div>
        <div className="lastname">
        <input style={{fontSize: "12px"}} type="text" name="lastname" placeholder="lastname" />
        </div>
        <div className="email">
        <input style={{fontSize: "12px"}} type="text" name="email" placeholder="Email" />
        </div>
        <div className="password">
        <input style={{fontSize: "12px"}} type="text" name="password" placeholder="Password" />
        </div>
        <div style={{marginTop: "5%"}} className="submit">
        <Link to="/posts" style={{width: "100%", fontSize: "12px"}} className="waves-effect waves-light btn">Signup
        </Link>
        </div>
    </form>
   
    </div>
</div>



)
}

export default Signup;