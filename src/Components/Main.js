import 'materialize-css/dist/css/materialize.min.css';
import React, {useState, useEffect} from "react";
import Login from '../Pages/Login';
import { Route, Switch } from "react-router-dom";
import Nav from './Nav';
import Home from '../Pages/Home';
import Search from '../Pages/Search';
import Profile from '../Pages/Profile';

export default function Main(props) {

const [posts, setPosts] = useState(null);

const URL = "https://social-full-backend.herokuapp.com/post/"

// *************** SHOW ALL
const getPosts = async () => {
const response = await fetch(URL);
const data = await response.json();
setPosts(data);
};

// **************** DELETE POST
const deletePost= async id => {
await fetch(URL + id, {
method: "DELETE",
})
getPosts();
};

// ***************** CREATE POST
const createPost = async (post) => {
  // make post request to create people
  await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify(post),
  });
  // update list of people
  getPosts();
};

// when app run, already reload data
useEffect(() => getPosts(), []);

return (
<div className="main">
  <Switch>
    <Route exact path="/">
      <Login/>
    </Route>
    <Route path="/posts">
      <Nav/>
      <Route path="/posts/home" render={rp=> (
        <Home posts={posts} user={props.user} deletePost={deletePost} createPost={createPost} {...rp} />
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