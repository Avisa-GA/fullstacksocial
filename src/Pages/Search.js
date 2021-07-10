
import React, { useState, useEffect } from "react";
import {auth} from "../services/firebase";
import { allUsers, allFolowers, follow, unfollow } from "../services/user-service";

export default function Search({userState}) {

const [users, setUsers] = useState([]);

// **************** handle Change for following


// ******************** Get All Users
async function getAllUsers() {
    setUsers(await allUsers());
}

// *********************** Follow / unFollow
async function handleFollow(id) {
  const token = await auth.currentUser.getIdToken();
  const user = users.find(user => user._id === id);
  const hasFollowed = user.following.includes(userState._id);
  if(hasFollowed) {
  await unfollow(id, token);
  } else {
  await follow(id, token);
  }
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