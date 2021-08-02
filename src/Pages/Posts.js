import React from "react";
import Post from "./Post";

export default function Posts({ posts, handleDelete }) {
  console.log("You see from posts page: ", posts);
  return (
    <ul style={{ marginTop: "5%" }} className="collection with-header">
      <li className="collection-header">
        <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#00695c" }}>
          These are some posts
        </h2>
      </li>
      <li className="collection-item">
        {posts.map((post) => (
          <Post key={post.id} post={post} handleDelete={handleDelete} />
        ))}
      </li>
    </ul>
  );
}
