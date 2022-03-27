import { useContext, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

import AuthContext from '../../store/auth-context';
import { signupUser } from '../../utils/helper';

export default function Signup() {
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

        if (res.error) {
            alert(res.message);
        } else {
            authCtx.login(res.data);
            navigator('/', { replace: true }); // redirect user afer sign up
        }
    }

    return (
        <>
            {/* <div>
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
            </form> */}


            <div className="w-full h-4/5 grid grid-cols-1 md:grid-cols-2 justify-items-center items-center">
                <div className="signupForm rounded-2xl w-11/12 md:w-8/12 p-5">
                    <div className="signupForm__title text-5xl font-medium">
                        Sign Up<span className="text-sky-400">.</span>
                    </div>

                    <div className="loginForm__subtitle py-5 text-base">
                        Already have an account?
                        <span className="ml-2 text-sky-400 font-medium">
                            <Link to='/login'>
                                Login
                            </Link>
                        </span>
                    </div>

                    <div className="loginForm__form">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="block">
                                    <span className="text-grey-700">First Name</span>
                                    <input type='text' onChange={e => setFirstName(e.target.value)} className="mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" placeholder='Enter First Name' required />
                                </label>
                            </div>

                            <div className="mb-3">
                                <label className="block">
                                    <span className="text-grey-700">Last Name</span>
                                    <input type='text' onChange={e => setLastName(e.target.value)} className="mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" placeholder='Enter Last Name' required />
                                </label>
                            </div>

                            <div className="mb-3">
                                <label className="block">
                                    <span className="text-grey-700">Email Address</span>
                                    <input type='email' onChange={e => setEmail(e.target.value)} className="mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" placeholder='jondoe@email.com' required />
                                </label>
                            </div>

                            
                            <div className="mb-3">
                                <label className="block">
                                    <span className="text-grey-700">Phone Number</span>
                                    <input type='text' onChange={e => setPhoneNumber(e.target.value)} className="mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" placeholder='Enter Phone Number' required />
                                </label>
                            </div>

                            <div className="mb-3">
                                <label className="block">
                                    <span className="text-grey-700">Password</span>
                                    <input type='password' onChange={e => setPassword(e.target.value)} className="mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" placeholder='Password' required />
                                </label>
                            </div>

                            <div className="mt-6">
                                <button className="py-3 w-24 bg-sky-400 text-white rounded-full" type="submit">
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="hidden md:block bg-[url('https://images.unsplash.com/photo-1599875953199-2b39f58d106a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=773&q=80')] bg-right bg-no-repeat w-full h-full">
                </div>
            </div>
        </>
    );
}