import 'materialize-css/dist/css/materialize.min.css';
import React, {useState, useEffect} from "react";
import Login from '../Pages/Login';
import { Route, Switch } from "react-router-dom";
import Nav from './Nav';
import Home from '../Pages/Home';
import Search from '../Pages/Search';
import Profile from '../Pages/Profile';
import {login, signUp, auth, signOut} from '../services/firebase';
import axios from "axios";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dzsyqjq3i/image/upload"
const URL = "https://social-full-backend.herokuapp.com/"

export default function Main() {



// ********************* LOGIN / SIGNUP

// for signup or login
const [formMode, setFormMode] = useState({
  loginEnabled: false
  });
  
  // creating a new form
  const [formState, setFormState] = useState(newForm());
  
  // user state
  const [userState, setUserState] = useState(null);
  
  async function getLoggedInUser(user) {
    const token = await user.getIdToken();
  return axios({
  method: "GET",
  url: `${URL}api/users/login`,
  headers: {
    "authorization": "bearer " + token
  }
  });
  }
  
  async function handleSignup(e) {
  e.preventDefault();
  const {email, password, firstname, lastname} = formState;
  try {
  const {user} = await signUp(email, password);
  const token = await user.getIdToken();
  let imageData;
  
  if (formState.image) {
  // upload image to cloudinary
  const data = new FormData();
  data.append("file", formState.image);
  data.append("upload_preset", "ml_default");
  // fetch image from cloudinary
  imageData = await axios({
  url: CLOUDINARY_URL,
  method: "POST",
  data
  });
  }
  
   await axios({
  url: `${URL}api/users/signup`,
  method: "POST",
  headers: {
    "authorization": "bearer " + token
  },
  data: {
  firstname,
  lastname,
  email,
  firebaseUid: user.uid,
  avatarUrl: imageData ? imageData.data.secure_url : ""
  }
  });
  
  setFormState(newForm());
  setFormMode({loginEnabled: true});
  
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

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
    if (user) {
    const {data} = await getLoggedInUser(user);
    if (!data) await signOut();
    setUserState({ ...user, ...data });
    } else {
    setUserState(user);
    }
    });
    return unsubscribe;
    });
  
    const { loginEnabled } = formMode;

// ********************* POSTS

const [posts, setPosts] = useState(null);

// const URL = "https://social-full-backend.herokuapp.com/post/"

// *************** SHOW ALL
const getPosts = async (uid) => {
const url = uid ? URL + '?uid=' + uid : URL
const response = await fetch(`${url}post`);
const data = await response.json();
setPosts(data);
};

// **************** DELETE POST
const deletePost= async id => {
  const token = await userState.getIdToken();
await fetch(`${URL}post/${id}`, {
method: "DELETE",
headers: {
  "authorization": "bearer " + token
}
})
getPosts(userState.uid);
};

// ***************** CREATE POST
const createPost = async (post) => {
  const token = await userState.getIdToken();
  // make post request to create people
  await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
      "authorization": "bearer " + token
    },
    body: JSON.stringify(post),
  });
  // update list of people
  getPosts(userState.uid);
};

// when app run, already reload data
useEffect(() => {
  if(userState) {
    getPosts(userState.uid);
  } else {
    getPosts();
  }
 
}, [userState]);

return (
<div className="main">
  <Switch>
    <Route exact path="/">
      <Login 
      setFormMode={setFormMode}
      userState={userState}
      handleSignout={handleSignout}
      handleSignup={handleSignup}
      handleChange={handleChange}
      handleLogin={handleLogin}
      handleImageFile={handleImageFile}
      loginEnabled={loginEnabled}
      formState={formState}
      />
    </Route>
    <Route path="/posts">
      <Nav/>
      <Route path="/posts/home" render={rp=> (
        <Home 
        posts={posts} 
        user={userState} 
        deletePost={deletePost} 
        createPost={createPost} 
        {...rp} />
        )} />
        <Route path="/posts/search">
          <Search />
        </Route>
        <Route path="/posts/profile">
          <Profile />
        </Route>
      </Route>
  </Switch>
</div>
);
};