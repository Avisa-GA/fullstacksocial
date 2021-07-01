import 'materialize-css/dist/css/materialize.min.css';
import React, {useState, useEffect} from "react";
import Login from '../Pages/Login';
import { Route, Switch } from "react-router-dom";
import Signup from '../Pages/Signup';
import Nav from './Nav';
import Home from '../Pages/Home';
import Search from '../Pages/Search';
import Profile from '../Pages/Profile';

export default function Main(props) {

  const [posts, setPosts] = useState(null);

  const URL = "https://social-full-backend.herokuapp.com/post/"

  // SHOW ALL
  const getPosts = async () => {
      const response = await fetch(URL);
      const data = await response.json();     
      setPosts(data);
  };

 // when app run, already reload data
useEffect(() => getPosts(), []);

return (
<div className="main">
    <Switch>
        <Route exact path="/">
            <Login />
        </Route>
        <Route path="/posts">
            <Nav />
            <Route path="/posts/home">
              <Home posts={posts} />
            </Route>
            <Route path="/posts/search">
              <Search />
            </Route>
            <Route path="/posts/profile">
              <Profile />
            </Route>
        </Route>
        <Route to="/signup">
            <Signup />
        </Route>
    </Switch>
</div>
);
};