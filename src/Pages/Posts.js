import React from "react";
import Post from "./Post";

export default function Posts({ posts, handleDelete }) {
 console.log("posts from Posts.js: ", posts)
  return (
    <>
    {posts.map((post, index) => (
    <ul key={index} style={{ marginTop: "5%" }} className="collection with-header">
      <li className="collection-header">
        <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#00695c" }}>
          These are some posts
        </h2>
      </li>
      <li className="collection-item">
          <Post post={post} handleDelete={handleDelete} />
        
      </li>
    </ul>
    ))}
    </>
  );
}
