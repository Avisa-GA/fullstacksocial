import { useState, useEffect } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import {auth} from './services/firebase';
import './App.css';
import Main from './Components/Main';

function App() {

const [user, setUser] = useState(null);

useEffect(() => {
const unsubscribe = auth.onAuthStateChanged(user => setUser(user));
return () => {
    unsubscribe()
}; // cleanup effect
}, []);

console.log("I am here:", user)
return (
<div className="App">
 <Main user={user}/>
</div>
);
}

export default App;