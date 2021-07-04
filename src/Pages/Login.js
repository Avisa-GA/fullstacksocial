import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import {login, signUp, signOut, auth} from '../services/firebase';
import axios from "axios";


const URL = "https://social-full-backend.herokuapp.com/api/users"
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dzsyqjq3i/image/upload"

export default function Login(props) {

    // for signup or login
    const [formMode, setFormMode] = useState({
        loginEnabled: false
    });

    // creating a new form
    const [formState, setFormState] = useState(newForm());

    // user state
    const [userSate, setUserState] = useState(null);

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
            url: URL + "signup",
            method: "POST",
            data: {
                firstname,
                lastname,
                email,
                firebaseUid: user.uid,
                profileImageUrl: image ? image.secure_url : ""
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
           signOut();
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
  {userSate && (
    <div className="login">
    <div style={{padding: "20%"}} className="card">
    <h6 style={{fontWeight: "bold", color: "rgb(38, 156, 143)", marginTop: "-2%"}}>Log in to your account</h6>
    <form>
        <div className="email">
            <input id="email" type="email" class="validate" placeholder="Email" style={{fontSize: 12}}/>
        </div>
        <div className="password">
            <input id="password" type="password" class="validate" placeholder="Password" style={{fontSize: 12}}/>
        </div>
        <div className="submit">
            <input style={{width: "100%", marginTop: "5%"}}  type="button" value="Submit" className="waves-effect waves-light btn" />
        </div>
        <div className="signup">
            <p style={{fontSize: 12}}>Don't have an account? <Link to="/signup">Signup</Link></p>
        </div>

    </form>
</div>
</div>
  )}
</>
)};