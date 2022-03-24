import { useState } from 'react';
import { Link } from 'react-router-dom';

async function signupUser(credentials){
    return fetch('http://localhost:8080/mountpizza/users/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    .then(res => res.json())
}

function Signup() {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = await signupUser({
            firstName,
            lastName,
            email,
            phoneNumber,
            password
        });

        console.log(data);
    }

    return (
        <>
            <h1>Signup Page</h1>
            <h5>
                Already got an account? <Link to='/login'>Login</Link>
            </h5>
            <br />

            <form onSubmit = {handleSubmit} method='POST' autoComplete='off'>
                <div>
                    <label htmlFor='fname'>
                        First Name
                    </label><br />
                    <input id='fname' name='fname' type='string' onChange={e => setFirstName(e.target.value)} required />
                </div>

                <div>
                    <label htmlFor='lname'>
                        Last Name
                    </label><br />
                    <input id='lname' name='lname' type='string' onChange={e => setLastName(e.target.value)} required />
                </div>

                <div>
                    <label htmlFor='email'>
                        Email
                    </label><br />
                    <input id='email' name='email' type='email' onChange={e => setEmail(e.target.value)} required />
                </div>

                <div>
                    <label htmlFor='phone'>
                        Phone Number
                    </label><br />
                    <input id='phone' name='phone' type='String' onChange={e => setPhoneNumber(e.target.value)} required />
                </div>

                <div>
                    <label htmlFor='password'>
                        Password
                    </label><br />
                    <input id='password' name='password' type='password' onChange={e => setPassword(e.target.value)} required />
                </div>
                <br />
                <div>
                    <button type='submit'>
                        Sign Up
                    </button>
                </div>
            </form>
        </>
    )
}

export default Signup;