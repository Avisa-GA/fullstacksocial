import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {logout} from "../services/firebase";

function Signup(props) {

const [details, setDetails] = useState({name: "", email: "", password: ""});



return (

    <div className="login">
    <div style={{padding: "20%"}} className="card">
    <h6 style={{fontWeight: "bold", marginBottom: "25%"}}>Create New Account</h6>
    <form>
        <div className="username">
        <input style={{fontSize: "12px"}} type="text" name="name" id="name" placeholder="Username" onChange={e=> setDetails({...details, name:
            e.target.value})} value={details.name}/>
        </div>
        <div className="email">
        <input style={{fontSize: "12px"}} type="text" name="email" id="email" placeholder="Email" onChange={e=> setDetails({...details, email:
            e.target.value})} value={details.email}/>
        </div>
        <div className="password">
        <input style={{fontSize: "12px"}} type="text" name="password" id="password" placeholder="Password" onChange={e=>
            setDetails({...details, password: e.target.value})} value={details.password}/>
        </div>
        <div style={{marginTop: "5%"}} className="submit">
        <Link onClick={logout} to="/posts" style={{width: "100%", marginTop: "5%", fontSize: "12px"}} className="waves-effect waves-light btn">Signup
        </Link>
        </div>
    </form>
   
    </div>
</div>



)
}

export default Signup;