import React, {useState} from 'react'

function LoginForm({Login, error}) {

    const [details, setDetails] = useState({name: "", email: "", password: ""});

    const submitHandler = e => {
         e.preventDefault();
         Login(details);
    };

    return (
        <form onSubmit={submitHandler}>
            <div style={{margin: "350px", marginTop: "50px"}} className="form-inner">
                <h5>Login to your account</h5>
                {(error !== "") ? ( <div className="error">{error}</div> ) : "" }
                <div className="form-group">
                    <label style={{marginRight: "100%"}} htmlFor="name">Name:</label>
                    <input type="text" placeholder="Username" name="name" id="name" onChange={e => setDetails({...details, name: e.target.value})} value={details.name}/>
                </div>
                <div className="form-group">
                   <label style={{marginRight: "100%"}} htmlFor="email">Email:</label>
                    <input type="text" name="email" id="email" onChange={e => setDetails({...details, email: e.target.value})} value={details.email}/>
                </div>
                <div className="form-group">
                 <label style={{marginRight: "100%"}} htmlFor="password">Password:</label>
                    <input type="text" name="password" id="password" onChange={e => setDetails({...details, password: e.target.value})} value={details.password}/>
                </div>
                <input style={{marginTop: "5%"}} className="waves-effect waves-light btn" type="submit" value="Login" />
            </div>
        </form>
    )
}

export default LoginForm
