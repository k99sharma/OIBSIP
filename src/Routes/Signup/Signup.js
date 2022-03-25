import { useContext, useState } from "react";
import {Link, useNavigate} from 'react-router-dom';

import AuthContext from '../../store/auth-context';
import { signupUser } from '../../utils/helper';

export default function Signup()
{
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [password, setPassword] = useState();

    const authCtx = useContext(AuthContext);
    const navigator = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const res = await signupUser({
            firstName,
            lastName,
            email,
            phoneNumber,
            password
        });

        if(res.error){
            alert(res.message);
        }else{
            authCtx.login(res.data);
            navigator('/', {replace: true}); // redirect user afer sign up
        }
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