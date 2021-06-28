import React from "react";
import { Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';


export default function Nav() {

return (
<div className="nav">
<nav className="pink darken-4">
<Link style={{marginRight: "10%"}} className="brand-logo right"> 🚀 </Link>
    <div style={{marginLeft: "5%", marginRight: "5%"}} className="nav-wrapper fixed left">
    <ul >
      <li><Link to="/posts/home"><HomeIcon /></Link></li>
      <li><Link style={{marginLeft: "150%"}} to="/posts/search"><SearchIcon /></Link></li>
      <li><Link style={{marginLeft: "300%"}} to="/posts/profile"><PersonIcon /></Link></li>
      </ul>
    </div>
  </nav>
</div>
);
};