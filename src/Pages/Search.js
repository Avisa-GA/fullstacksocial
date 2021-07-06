
import React, { useState, useEffect } from "react";
import { allUsers } from "../services/user-service";

export default function Search({userState}) {

const [users, setUsers] = useState([]);
const [isFollowing, setIsFollowing] = useState(false)

// **************** handle Change for following


// ******************** Get All Users
async function getAllUsers(uid) {
    setUsers(await allUsers(uid));
}


// ************************ Load data useEffect
useEffect(() => {
    if(userState) {
      getAllUsers(userState._id);
    } else {
      getAllUsers();
    }
  }, [userState]);


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
      return users.map((user, index) => {
        <ul key={index} className="collection with-header left-align">
        <li className="collection-header"><h4>Friends List</h4></li>
        <li onChange={() => setIsFollowing(!isFollowing)} className="collection-item"><div>{user.firstName} {user.lastName}<a style={{marginBottom: "1%", color: "gray", fontWeight: "bold"}} class="waves-effect secondary-content waves-light btn-small pink lighten-4">{ isFollowing ? "Follow" : "Following" }</a></div></li>
      </ul>
      })
  }
  
    return (
        <div style={{marginLeft: "10%", marginTop: "5%"}} className="home-card">
        {users ? loaded() : loading() }
        </div>
    )
}