import { useState } from "react";

export default function Login()
{
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submit');
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