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
import { getPosts } from "../services/post-service";



export default function Main() {

const history = useHistory();
// ********************* LOGIN / SIGNUP

const [userState, setUserState] = useState(null);

useEffect(() => {
const unsubscribe = auth.onAuthStateChanged(async (userState) => {
if (userState) {
const {data} = await getLoggedInUser(userState);
if (!data) await signOut();
else setUserState({ ...userState, ...data });
} else {
setUserState(userState);
}
});
return unsubscribe;
}, [])


return (
<div className="main">
  <Nav userState={userState} />
  <Switch>
    <Route exact path="/" >
      <Home userState={userState}/>
      </Route>
      <Route path="/search">
        <Search />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
  </Switch>
</div>
);
};