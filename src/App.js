import "materialize-css/dist/css/materialize.min.css";
import { useEffect, useState } from "react";
import "./App.css";
import "materialize-css/dist/css/materialize.min.css";
import { AuthProvider } from "./services/contex";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
import Index from "./pages/Index";
import Search from "./pages/Search";
import Profile from "./pages/Profile";

function App() {
  const [postsState, setPostsState] = useState({ posts: [] });
  const POST_URL = "https://social-app-end.herokuapp.com/post";

  useEffect(() => {
    getPosts();
  }, []);
  // * ******************************* Index
  async function getPosts() {
    try {
      const posts = await fetch(POST_URL).then((response) => response.json());
      setPostsState({ posts });
    } catch (error) {
      console.log(error);
    }
  }
  // * ************************************ Create
  async function handleAdd(formInput, token) {
    try {
      const posts = await fetch(POST_URL, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
          authorization: "bearer " + token,
        },
        body: JSON.stringify(formInput),
      }).then((res) => res.json());
      console.log(posts);
      setPostsState({ posts });
    } catch (error) {
      console.log(error);
    }
  }
  //  ! ********************************************* Delete
  async function handleDelete(postId, token) {
    try {
      const posts = fetch(POST_URL + "/" + postId, {
        method: "DELETE",
        headers: {
          authorization: "bearer " + token,
        },
      }).then((res) => res.json());
      setPostsState({ posts });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="App">
      <AuthProvider>
        <Nav />
        <Switch>
          <Route exact path="/">
            <Index 
               posts={postsState.posts}
               handleDelete={handleDelete}
               handleAdd={handleAdd}
            />
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
}

export default App;
