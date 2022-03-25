import { useContext, useState } from "react";
import { useNavigate } from "react-router";

import AuthContext from "../../store/auth-context";
import { loginUser } from '../../utils/helper';

export default function Login()
{
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const authCtx = useContext(AuthContext);
    const navigator = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await loginUser({
            email,
            password
        });

        if(res.error){
            alert(res.message);
        }else{
            // calling context login handler
            authCtx.login(res.data);
            navigator('/', {replace: true});  // redirecting user to homepage on login
        }
    }

    return(
        <>
            <div>
                <h1>Login Page</h1>
            </div>
            <br />

            <form onSubmit={handleSubmit} autoComplete="off">
                <div>
                    <label htmlFor="email">
                        Email Address
                    </label><br />
                    <input 
                        id='email' 
                        type='email'
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Enter Email Address" 
                        required 
                    />
                </div>

                <div>
                    <label htmlFor="password">
                        Password
                    </label><br />
                    <input
                        id='password'
                        type='password'
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Enter Password"
                        required 
                    />
                </div>

                <div>
                    <button type='submit'>
                        Login
                    </button>
                </div>
            </form>
        </>
    );
}