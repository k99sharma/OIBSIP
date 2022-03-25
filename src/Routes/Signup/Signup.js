import { useState } from "react";
import {Link} from 'react-router-dom';

export default function Signup()
{
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Submit')
    }

    return(
        <>
            <div>
                Signup Page
                <p>Already got an account? <Link to='/login'>Login</Link></p>
            </div><br />

            <form onSubmit = {handleSubmit} autoComplete="off">
                <div>
                    <label htmlFor="fname">
                        First Name
                    </label><br />
                    <input 
                        type='text' 
                        id='fname'
                        placeholder="Enter First Name" 
                        onChange = {e => setFirstName(e.target.value)}
                        name='fname' 
                        required 
                    />
                </div>

                <div>
                    <label htmlFor="lname">
                        Last Name
                    </label><br />
                    <input 
                        type='text' 
                        id='lname'
                        placeholder="Enter Last Name" 
                        onChange = {e => setLastName(e.target.value)}
                        name='lname' 
                        required 
                    />
                </div>

                <div>
                    <label htmlFor="email">
                        Email Address
                    </label><br />
                    <input 
                        type='email' 
                        id='email'
                        placeholder="Enter Email Address" 
                        onChange = {e => setEmail(e.target.value)}
                        name='email'
                        required 
                    />
                </div>

                <div>
                    <label htmlFor="phoneNumber">
                        Phone Number
                    </label><br />
                    <input 
                        type='text' 
                        id='phoneNumber'
                        placeholder="Enter Phone Number" 
                        onChange = {e => setPhoneNumber(e.target.value)}
                        name='phoneNumber' 
                        required 
                    />
                </div>

                <div>
                    <label htmlFor="password">
                        Password
                    </label><br />
                    <input 
                        type='password' 
                        id='password'
                        placeholder="Enter Password"
                        onChange = {e => setPassword(e.target.value)} 
                        name='password' 
                        required 
                    />
                </div>

                <div>
                    <button type='submit'>
                        Signup
                    </button>
                </div>
            </form>
        </>
    );
}