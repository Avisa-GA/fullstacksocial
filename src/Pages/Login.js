import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import {login, signUp, auth, signOut} from '../services/firebase';
import axios from "axios";


const URL = "https://social-full-backend.herokuapp.com/api/users"
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dzsyqjq3i/image/upload"

export default function Login() {

// for signup or login
const [formMode, setFormMode] = useState({
loginEnabled: true
});

// creating a new form
const [formState, setFormState] = useState(newForm());

// user state
const [userState, setUserState] = useState(null);

useEffect(() => {
const unsubscribe = auth.onAuthStateChanged(async (user) => {
if (user) {
const {data} = await getLoggedInUser(user.uid);
setUserState(data);
} else {
setUserState(user);
}
});
return unsubscribe;
});

function getLoggedInUser(uid) {
return axios({
method: "GET",
url: URL + "/" + uid
});
}

async function handleSignup(e) {
e.preventDefault();
const {email, password, firstname, lastname} = formState;
try {
const {user} = await signUp(email, password);
let image;

if (formState.image) {
// upload image to cloudinary
const data = new FormData();
data.append("file", formState.image);
data.append("upload_preset", "ml_default");
// fetch image from cloudinary
const res = await fetch(CLOUDINARY_URL, {
method: "POST",
body: data
});
image = await res.json();
}

const {data} = await axios({
url: URL + "/signup",
method: "POST",
data: {
firstname,
lastname,
email,
firebaseUid: user.uid,
avatarUrl: image ? image.secure_url : ""
}
});

setFormState(newForm());
setUserState(data);

} catch ({message}) {
setFormState({ ...newForm(), errors: message });
}
}

async function handleLogin(e) {
e.preventDefault();
try {
const {email, password} = formState;
await login(email, password);
setFormState(newForm());
} catch ({message}) {
setFormState({ ...newForm(), errors: message });
}
}

function handleChange(e) {
setFormState((prevState) => ({
...prevState,
[e.target.name]: e.target.value,
errors: ""
}));
}

function handleImageFile(e) {
const file = e.target.files[0];
setFormState((prevState) => ({ ...prevState, image: file }));
}

function handleSignout() {
signOut()
}

function newForm() {
return {
email: "",
password: "",
firstname: "",
lastname: "",
image: null,
errors: ""
};
}

const {loginEnabled} = formMode;
const {email, password, firstname, lastname} = formState;

return (
<>
    <h6 style={{color: "blue"}}>Welcome to social web App</h6>
    {userState && ( <button onClick={handleSignout} className="waves-effect waves-light btn">Sign Out
    </button>)}
    {!userState && (
    <>
        <div className="login">
            <div style={{padding: "20%"}} className="card">
                <h6 style={{fontWeight: "bold", color: "rgb(38, 156, 143)", marginBottom: "10%" , fontSize: 16}}>{ loginEnabled ? "Log into your account" : "Create New Account"}</h6>
                <form onSubmit={loginEnabled ? handleLogin : handleSignup}>
                    {!loginEnabled && (<>
                        <div className="firstname">
                            <input style={{fontSize: "12px"}} type="text" name="firstname" placeholder="firstname"
                                value={firstname} onChange={handleChange} />
                        </div>
                        <div className="lastname">
                            <input style={{fontSize: "12px"}} type="text" name="lastname" placeholder="lastname"
                                value={lastname} onChange={handleChange} />
                        </div>
                        <div className="profileImage">
                            <input style={{fontSize: "12px", display: "flex"}} type="file" name="image" onChange={handleImageFile} />
                        </div>
                    </>
                    )}
                    <div className="email">
                        <input type="email" class="validate" name="email" placeholder="Email" value={email}
                            style={{fontSize: 12}} onChange={handleChange} />
                    </div>
                    <div className="password">
                        <input type="password" class="validate" name="password" placeholder="Password" value={password}
                            style={{fontSize: 12}} onChange={handleChange} />
                    </div>
                    <div className="submit">
                        <Link to="/posts">
                        <input style={{width: "100%", fontSize: "12px", marginTop: "5%"}}
                            className="waves-effect waves-light btn" type="submit" value={loginEnabled ? "Login"
                            : "Signup" } />
                        </Link>
                    </div>
                    <div className="signup">
                        <button onClick={()=> setFormMode({loginEnabled: !loginEnabled})}
                            style={{marginRight: "40%", fontSize: "14px", borderStyle: "none", color:"rgb(9, 107, 177)", backgroundColor: "white"}}
                            className="waves-effect">{loginEnabled ? "Go to Sign up page" : "Go to login page"}
                        </button>

                    </div>

                </form>
            </div>
        </div>
    </>
    )}
</>
)};