
import React, { useState, useEffect } from "react";
import { allUsers } from "../services/user-service";

export default function Search({userState}) {

const [users, setUsers] = useState([]);

// **************** handle Change for following


// ******************** Get All Users
async function getAllUsers() {
    setUsers(await allUsers());
}


// ************************ Load data useEffect
useEffect(() => {
      getAllUsers();
  }, []);

console.log("users are here" ,users.map((user,index) => {
  return user.firstName
}))
// ************************** Loading

const loading = () => {
    return ( <div style={{marginRight: "5%"}} className="preloader-wrapper active">
      <div className="spinner-layer spinner-red-only">
        <div className="circle-clipper left">
          <div className="circle"></div>
        </div>
        <div className="gap-patch">
          <div className="circle"></div>
        </div>
        <div className="circle-clipper right">
          <div className="circle"></div>
        </div>
      </div>
    </div>
    );
    };

  const loaded = () => {
    return users.map((user, index) => (
      <ul key={index} className="collection with-header">
        <li className="collection-item"><div><p className="left-align">{user.firstName}</p><button style={{marginBottom: "5%"}} className="btn pink darken-2 secondary-content" >Follow</button></div></li>
      </ul>
    ))
  }
  
    return (
        <div style={{marginLeft: "10%", marginTop: "5%", width: 300}}>
          <h4 className="left-align">Friends List</h4>
          {loaded()}
        {users ? loaded() : loading() }
        </div>
    )
}