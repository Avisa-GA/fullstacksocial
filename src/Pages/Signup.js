import React, {useState} from 'react'

function Signup() {

    const [details, setDetails] = useState({name: "", email: "", password: ""});

    const submitHandler = e => {
         e.preventDefault();
        //  Login(details);
    };

    return (
        <form onSubmit={submitHandler}>
            <div style={{margin: "350px", marginTop: "50px"}} className="form-inner">
            <h6 style={{fontWeight: "bold"}}>Create an Account</h6>
                {/* {(error !== "") ? ( <div className="error">{error}</div> ) : "" } */}
                <div className="form-group">
                    
                    <input type="text" name="name" id="name" placeholder="Username" onChange={e => setDetails({...details, name: e.target.value})} value={details.name}/>
                </div>
                <div className="form-group">
                  
                    <input type="text" name="email" id="email" placeholder="Email" onChange={e => setDetails({...details, email: e.target.value})} value={details.email}/>
                </div>
                <div className="form-group">
                
                    <input type="text" name="password" id="password" placeholder="Password" onChange={e => setDetails({...details, password: e.target.value})} value={details.password}/>
                </div>
                <input style={{marginTop: "5%", width: "100%"}} className="waves-effect waves-light btn" type="submit" value="Signup" />
            </div>
        </form>
    )
}

export default Signup;
