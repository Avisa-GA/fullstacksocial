import 'materialize-css/dist/css/materialize.min.css';
import React, {useState, useEffect} from "react";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup"
import { Route, Switch } from "react-router-dom";
import Nav from './Nav';
import Home from '../Pages/Home';
import Search from '../Pages/Search';
import Profile from '../Pages/Profile';
import { signOut, auth } from "../services/firebase";
import { getLoggedInUser } from "../services/user-service";
import { useHistory } from 'react-router-dom';



export default function Main() {

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dzsyqjq3i/image/upload"
const URL = "https://social-full-backend.herokuapp.com/post/"

const history = useHistory();
// ********************* LOGIN / SIGNUP

const [userState, setUserState] = useState(null);

useEffect(() => {
const unsubscribe = auth.onAuthStateChanged(async (user) => {
if (user) {
const {data} = await getLoggedInUser(user);
if (!data) await signOut();
else setUserState({ ...user, ...data });
} else {
setUserState(user);
}
});
return unsubscribe;
}, [])

// ********************* POSTS

const [posts, setPosts] = useState(null);

// const URL = "https://social-full-backend.herokuapp.com/post/"

// *************** SHOW ALL
const getPosts = async (uid) => {
const url = uid ? URL + '?uid=' + uid : URL
const response = await fetch(url);
const data = await response.json();
setPosts(data);
};

// **************** DELETE POST
const deletePost= async id => {
const token = await userState.getIdToken();
await fetch(URL + id , {
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
  <Nav userState={userState} />
  <Switch>
    <Route exact path="/" render={rp=> (
      <Home posts={posts} user={userState} deletePost={deletePost} createPost={createPost} {...rp} />
      )}
      />
      <Route path="/search">
        <Search />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
  </Switch>
</div>
);
};