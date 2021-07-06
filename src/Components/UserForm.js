import { useState } from "react";
import { signUp, login } from "../services/firebase";
import { uploadAvatar, createUser } from "../services/user-service";
import { useHistory } from "react-router-dom";

export default function UserForm({isLogin}) {

    const [state, setState] = useState(newForm());
    const history = useHistory();

    function newForm() {
        return {
          email: "",
          password: "",
          firstName: "",
          lastName: "",
          image: null,
          errors: ""
        };
      }

      function handleChange(e) {
        setState((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
          errors: ""
        }));
      }
    async function handleLogin(e) {
          e.preventDefault();
          try {
              const {email, password} = state;
              await login(email, password);
              setState(newForm());
              history.push("/");
          } catch ({message}) {
              setState({ ...newForm(), errors: message })
          }
      }

   async function handleSignup(e) {
       e.preventDefault();
       const {email, password, firstName, lastName} = state;
       try {

        const {user} = await signUp(email, password);
        const token = await user.getIdToken();

        let imageData;

        if (state.image) {
            const data = new FormData();
            data.append("file", state.image);
            data.append("upload_preset", "ml_default");
            imageData = await uploadAvatar(data);
        }

        await createUser(
            {
              firstName,
              lastName,
              email,
              firebaseUid: user.uid,
              avatarURL: imageData ? imageData.data.secure_url : ""
            },
            token
          );
    
          setState(newForm());
          history.push("/");
        } catch ({ message }) {
          setState({ ...newForm(), errors: message });
        }
      }
   
   function handleImageFile(e) {
       const file = e.target.files[0];
       setState((prevState) => ({ ...prevState, image: file}));
   }

   const { firstName, lastName, email, password } = state;

 return(
     <>
              <div className="login">
                <form onSubmit={isLogin ? handleLogin : handleSignup}>
                  <div style={{padding: "20%"}} className="card">
                  <h6 style={{fontWeight: "bold", color: "rgb(38, 156, 143)", marginBottom: "10%" , fontSize: 16}}>{ isLogin ? "Log into your account" : "Create New Account"}</h6>
                  {state.errors && (
                            <p className="left-align" style={{color: "red", marginRight: "40%"}}>{state.errors}</p>
                        )}
                   {!isLogin && (
                       <>
                          <div className="firstname">
                            <input style={{fontSize: "12px"}} type="text" name="firstName" placeholder="firstname"
                                value={firstName} onChange={handleChange} />
                        </div>
                        <div className="lastname">
                            <input style={{fontSize: "12px"}} type="text" name="lastName" placeholder="lastname"
                                value={lastName} onChange={handleChange} />
                        </div>
                        <div className="profileImage">
                            <input style={{fontSize: "12px", display: "flex"}} type="file" name="image" onChange={handleImageFile} />
                        </div>
                       </>
                   )} 
                       <div className="email">
                        <input type="email" className="validate" name="email" placeholder="Email" value={email}
                            style={{fontSize: 12}} onChange={handleChange} />
                    </div>
                    <div className="password">
                        <input type="password" className="validate" name="password" placeholder="Password" value={password}
                            style={{fontSize: 12}} onChange={handleChange} />
                    </div>
                    <div className="submit">
                    <input style={{width: "100%", fontSize: "12px", marginTop: "5%"}}
                       className="waves-effect waves-light btn" type="submit" value={isLogin ? "Login"
                         : "Signup" } />
                    </div>

                  </div>
                  </form>
              </div>
     </>
 )
}