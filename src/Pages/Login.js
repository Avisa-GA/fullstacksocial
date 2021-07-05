import React from "react";
import { Link } from "react-router-dom";




export default function Login({loginEnabled, formState, userState, handleSignout, handleSignup, handleChange, handleLogin, handleImageFile, setFormMode}) {


const {email, password, firstname, lastname} = formState;

console.log("firstname : ", firstname)

return (
<>
    <h6 style={{color: "blue"}}>Welcome to social web App</h6>
    
    {userState && (
        <> 
        <h5>Hello, {userState.firstname} {userState.lastname}</h5>
    <button onClick={handleSignout} className="waves-effect waves-light btn">Sign Out
    </button>
    </>
    )}
    {!userState && (
    <>
        <div className="login">
            <div style={{padding: "20%"}} className="card">
                <h6 style={{fontWeight: "bold", color: "rgb(38, 156, 143)", marginBottom: "10%" , fontSize: 16}}>{ loginEnabled ? "Log into your account" : "Create New Account"}</h6>
                <form onSubmit={loginEnabled ? handleLogin : handleSignup}>
                    {/* *************** Signup */}
                    {!loginEnabled && (<>
                        <div className="firstname">
                            <input style={{fontSize: "12px"}} type="text" name="firstname" placeholder="firstname"
                                value={firstname} onChange={handleChange} />
                        </div>
                        <div className="lastname">
                            <input style={{fontSize: "12px"}} type="text" name="lastname" placeholder="lastname"
                                value={lastname} onChange={handleChange} />
                        </div>
                        <div className="profileImage">
                            <input style={{fontSize: "12px", display: "flex"}} type="file" name="image" onChange={handleImageFile} />
                        </div>
                    </>
                    )}
                    {/* **************** Login */}
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
   className="waves-effect waves-light btn" type="submit" value={loginEnabled ? "Login"
: "Signup" } />
                    </div>
                    <div className="signup">
                        <button onClick={()=> setFormMode({loginEnabled: !loginEnabled})}
                            style={{marginRight: "40%", fontSize: "14px", borderStyle: "none", color:"rgb(9, 107, 177)", backgroundColor: "white"}}
                            className="waves-effect">{loginEnabled ? "Go to Sign up page" : "Go to login page"}
                        </button>
                        <br />
                        <br />
                        {formState.errors && (
                            <p className="left-align" style={{color: "red", marginRight: "40%"}}>{formState.errors}</p>
                        )}
                    </div>

                </form>
            </div>
        </div>
    </>
    )}
</>
)};