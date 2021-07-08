import 'materialize-css/dist/css/materialize.min.css';
import React, {useState, useEffect} from "react";
import { AuthContext } from '../services/contex';
import Login from "../Pages/Login";
import Signup from "../Pages/Signup"
import { Route, Switch } from "react-router-dom";
import Nav from './Nav';
import Home from '../Pages/Home';
import Search from '../Pages/Search';
import Profile from '../Pages/Profile';
import { signOut, auth } from "../services/firebase";
import { getLoggedInUser } from "../services/user-service";


export default function Main() {

// ********************* LOGIN / SIGNUP

const [userState, setUserState] = useState([]);

useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged(async (user) => {
    if (user) {
      const { data } = await getLoggedInUser(user);
      if (!data) await signOut();
      else setUserState({ ...user, ...data });
    } else {
      setUserState(user);
    }
  });
  return unsubscribe;
}, []);


return (
<div className="main">
  <AuthContext.Provider value={{userState, setUserState}}>
  <Nav />
  <Switch>
    <Route exact path="/" >
      <Home />
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
  </AuthContext.Provider>
</div>
);
};