
import React from 'react';
import Posts from '../pages/Posts';
import PostForm from '../components/PostForm';


export default function Index({ posts, handleDelete, handleAdd }) {
  console.log("You see from index page: ", posts)
  return (
    <div style={{marginLeft: "20%", marginTop: "10%", width: "600px"}} className="home">
      <PostForm handleAdd={handleAdd}/>
      <Posts posts={posts} handleDelete={handleDelete}/>
    </div>
  )
}