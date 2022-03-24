import { useState } from "react";

async function loginUser(credentials){
    return fetch('http://localhost:8080/mountpizza/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json());

}

function Login(){
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await loginUser({
            email,
            password
        });
        let token = null;
        if(res.error){
            console.log(res.message);
            console.log(res.status);
        }else{
            token = res.data.token;
            console.log(token);
        }
    }

    return (
        <>
            <h1>Login Page</h1>
            <br />

            <form onSubmit={handleSubmit} method="POST" autoComplete="off">
                <div>
                    <label htmlFor='email'>Email Address</label>
                    <input id='email' name='email' type='email' onChange={e => setEmail(e.target.value)} required />
                </div>

                <div>
                    <label htmlFor='password'>Password</label>
                    <input id='password' name='password' type='password' onChange={e => setPassword(e.target.value)} required />
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

export default Login;