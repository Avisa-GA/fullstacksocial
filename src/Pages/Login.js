import React from "react";
import { Link } from "react-router-dom";

export default function Login() {


return (
<div className="login">
    <div style={{padding: "20%"}} className="card">
    <h6 style={{fontWeight: "bold", marginBottom: "25%"}}>Log in to your account</h6>
    <form>
        <div className="email">
            <input style={{fontSize: "12px"}} id="email" type="email" class="validate" placeholder="Email" />
        </div>
        <div className="password">
            <input style={{fontSize: "12px"}} id="password" type="password" class="validate" placeholder="Password" />
        </div>
        <div style={{marginTop: "5%"}} className="submit">
            <Link to="/posts" style={{width: "100%", marginTop: "5%", fontSize: "12px"}} className="waves-effect waves-light btn">Login
            </Link>
        </div>
    </form>
    <div style={{fontSize: "12px", marginTop: "10%"}} className="signup">
        <p>Don't have an account?
            <Link to="/signup">Signup</Link>
        </p>
    </div>
    </div>
</div>
)
}