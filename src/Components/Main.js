import 'materialize-css/dist/css/materialize.min.css';
import React from "react";
import Login from '../Pages/Login';
import { Route, Switch } from "react-router-dom";
import Signup from '../Pages/Signup';

export default function Main() {
return (
<div className="main">
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
};