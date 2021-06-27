import 'materialize-css/dist/css/materialize.min.css';
import React, {useState} from 'react';
import './App.css';
import Login from './Components/Login';
import { Route, Switch } from "react-router-dom";
import Signup from './Components/Signup';

function App() {

const adminUser = {
email: "admin@admin.com",
password: "admin123"
}

const [user, setUser] = useState({name: "", email: ""});
const [error, setError] = useState("");

const login = details => {
console.log(details);
if (details.email === adminUser.email && details.password === adminUser.password ) {
console.log("logged in")
setUser({
name: details.name,
email: details.email
})
} else {
console.log("Details do not match")
setError("Details do not match")
}
}

const Logout = () => {
console.log('Logout');
setUser({name: "", email: ""})
}

return (
<div className="App">

  {/* {(user.email !== "") ? (

  <div className="welcome">
    <h2><span>{user.name}</span></h2>
    <button className="waves-effect waves-light btn" onClick={Logout}>Logout</button>
  </div>
  ) : (
  <LoginForm Login={login} error={error} />
  )} */}
  
  <Switch>
    <Route exact path="/">
      <Login />
    </Route>
  <Route to="/signup">
   <Signup />
  </Route>
  </Switch>
  
</div>
);
}

export default App;