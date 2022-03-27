import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom';

import AuthContext from "../../store/auth-context";
import { loginUser } from '../../utils/helper';

export default function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const authCtx = useContext(AuthContext); // auth context
    const navigator = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await loginUser({
            email,
            password
        });

        if (res.error) {
            alert(res.message);
        } else {
            // calling context login handler
            authCtx.login(res.data);
            navigator('/', { replace: true });  // redirecting user to homepage on login
        }
    }

    return (
        <>
            <div className="w-full h-4/5 grid grid-cols-1 md:grid-cols-2 justify-items-center items-center">
                <div className="loginForm rounded-2xl w-11/12 md:w-8/12 h-4/5 md:h-5/6 p-5">
                    <div className="loginForm__title text-5xl font-medium">
                        Login<span className="text-amber-400">.</span>
                    </div>

                    <div className="loginForm__subtitle py-5 text-base">
                        Don't have an account?
                        <span className="ml-2 text-amber-400 font-medium">
                            <Link to='/signup'>
                                Sign Up
                            </Link>
                        </span>
                    </div>

                    <div className="loginForm__form">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="block">
                                    <span className="text-grey-700">Email Address</span>
                                    <input type='email' onChange={ e => setEmail(e.target.value) } className="mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" placeholder='jondoe@email.com' required />
                                </label>
                            </div>

                            <div className="mb-3">
                                <label className="block">
                                    <span className="text-grey-700">Password</span>
                                    <input type='password' onChange={ e => setPassword(e.target.value) } className="mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" placeholder='Password' required />
                                </label>
                            </div>

                            <div className="my-10">
                                <button className="bg-black text-amber-400 py-3 px-5 rounded-full" type="submit">
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="hidden md:block bg-[url('https://images.unsplash.com/photo-1489564239502-7a532064e1c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')] bg-right bg-no-repeat w-full h-full">

                </div>
            </div>
        </>
    );
}