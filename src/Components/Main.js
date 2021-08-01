import 'materialize-css/dist/css/materialize.min.css';
import { AuthProvider } from '../services/contex';
import Login from "../Pages/Login";
import Signup from "../Pages/Signup"
import { Route, Switch } from "react-router-dom";
import Nav from './Nav';
import Index from '../Pages/Index';
import Search from '../Pages/Search';
import Profile from '../Pages/Profile';



export default function Main() {




return (
<div className="main">
  <AuthProvider>
  <Nav />
  <Switch>
    <Route exact path="/" >
      <Index />
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
  </AuthProvider>
</div>
);
};