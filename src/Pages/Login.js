import React from "react";
import { Link } from "react-router-dom";

export default function Login() {


return (
<div className="login">
    <h6 style={{fontWeight: "bold"}}>Log in to your account</h6>
    <form>
        <div className="email">
            <input id="email" type="email" class="validate" placeholder="Email" />
        </div>
        <div className="password">
            <input id="password" type="password" class="validate" placeholder="Password" />
        </div>
        <div className="submit">
            <Link to="/posts" style={{width: "100%", marginTop: "5%"}} className="waves-effect waves-light btn">Login
            </Link>
        </div>
    </form>
    <div className="signup">
        <p>Don't have an account?
            <Link to="/signup">Signup</Link>
        </p>
    </div>
</div>
)
}