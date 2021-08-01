import { useState } from "react";
import { createUser, loginUser } from "../services/user-service";
import { useHistory } from "react-router-dom";

export default function UserForm({isLogin}) {

  const [formState, setFormState] = useState(newForm());
    const history = useHistory();

    function newForm() {
        return {
          email: "",
          password: "",
          passwordConf: "",
          firstName: "",
          lastName: "",
          password: "",
          image: null,
          errors: ""
        };
      }

   function matchingPassword() {
     if (isLogin) return true;
     return password === passwordConf;
   }

   function formValid() {
     const { email, password } = formState;
     return !!email && !!password
   }

   function handleChange(e) {
     setFormState((prevState) => ({
       ...prevState,
       [e.target.name]: e.target.value,
       errors: ''
     }));
   }

   async function handleLogin(e) {

     e.preventDefault();
     if (!formValid()) return;

     try {

      const { email, password } = formState;
      await loginUser(email, password);

      setFormState(newForm());

      history.push('/');

     } catch ({ message }) {
       setFormState({ ...newForm(), errors: message })
     }

   }

  async function handleSignup(e) {
     e.preventDefault();
     if (!formValid()) return;
     try {
       const userCreated = await createUser(formState);
       if (!userCreated) {
         setFormState({
           ...newForm(),
           errors: "An Error Occurred Creating Account"
         });
       } else {
         setFormState(newForm());
         history.push("/");
       }
     } catch ({ message }) {
       setFormState({ ...newForm(), errors: message });
     }
   }

   function handleImageFile(e) {
    const file = e.target.files[0];
    setFormState((prevState) => ({ ...prevState, image: file }));
  }

   const { firstName, lastName, email, password, passwordConf } = formState;

 return(
     <>
                <form onSubmit={isLogin ? handleLogin : handleSignup}>
                <div className="login">
                  <div style={{padding: "20%"}} className="card">
                  <h6 style={{fontWeight: "bold", color: "rgb(38, 156, 143)", marginBottom: "10%" , fontSize: 16}}>{ isLogin ? "Log into your account" : "Create New Account"}</h6>
                  {formState.errors && (
                            <p className="left-align" style={{color: "red", marginRight: "40%"}}>{formState.errors}</p>
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
                        <input type="password" className="validate" name="password" placeholder="p@$$w0rd" value={password}
                            style={{fontSize: 12}} onChange={handleChange} />
                    </div>
                    {!isLogin && (
                    <div className="passwordConf">
                        <input type="password" className="validate" name="passwordConf" placeholder="p@$$w0rd" value={password}
                            style={{fontSize: 12}} onChange={handleChange} />
                    </div>
                    )}
                    <div className="submit">
                    <input style={{width: "100%", fontSize: "12px", marginTop: "5%"}}
                       className="waves-effect waves-light btn" type="submit" value={isLogin ? "Login"
                         : "Signup" } />
                    </div>

                  </div>
                  </div>
                  </form>
     </>
 )
}