import { authService } from "fbase";
import React, { useState } from "react";

const Auth =  () =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    const onChange = (e) =>{
        const {target: {name, value}} =e;
        if(name ==="email"){
            setEmail(value);
        } else if( name ==="password"){
            setPassword(value);
        };
    };
    const onSubmit = async (e) =>{
        e.preventDefault();
        try {
            let data;
            if(newAccount){
                const data = await authService.createUserWithEmailAndPassword(email, password);
            } else {
                const data = await authService.signInWithEmailAndPassword(email,password);
            }
        } catch (error){
            setError(error.message)
        }   
    };
    const toggleA = () => setNewAccount((prev) => !prev);
    return(
    <div>
        <form onSubmit={onSubmit}>
            <input name="email" type="text" placeholder="Email" required 
            value={email} onChange={onChange} />
            <input name="password" type="password" placeholder="PassWord" required
            value={password} onChange={onChange} />
            <input type="submit" value={newAccount ? "Create Account" : "Log in" } />
            <br />
            {error}
        </form>
        <span onClick={toggleA}>{newAccount ? "Sign In" : "Create Account"}</span>
        <div>
            <button>Connect Google</button>
        </div>
    </div>
)};

export default Auth; 