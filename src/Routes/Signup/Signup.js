import { useContext, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

import AuthContext from '../../store/auth-context';
import { signupUser } from '../../utils/helper';
import { Spinner } from "../../components/Spinner/Spinner";

export default function Signup() {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [password, setPassword] = useState();

    const authCtx = useContext(AuthContext);
    const navigator = useNavigate();

    const [isActive, setIsActive] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsActive(true);

        if (!isActive) {
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
                alert('Signup Successful');
                navigator('/login', { replace: true }); // redirect user afer sign up
            }

            setIsActive(false);
        }
    }

    return (
        <>
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
                                    <input type='text' minLength='10' maxLength='10' onChange={e => setPhoneNumber(e.target.value)} className="mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" placeholder='Enter Phone Number' required />
                                </label>
                            </div>

                            <div className="mb-3">
                                <label className="block">
                                    <span className="text-grey-700">Password</span>
                                    <input type='password' onChange={e => setPassword(e.target.value)} className="mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" placeholder='Password' required />
                                </label>
                            </div>

                            <div className="mt-6">
                                {
                                    !isActive
                                        ?
                                        <button className="py-3 w-24 bg-sky-400 text-white rounded-full" type="submit">
                                            Sign Up
                                        </button>
                                        :
                                        <div className="flex items-center justify-center">
                                            <Spinner />
                                        </div>
                                }
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