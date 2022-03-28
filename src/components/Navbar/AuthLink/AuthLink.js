import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover } from "@headlessui/react";
import { logoutUser, titleCase } from '../../../utils/helper';
import AuthContext from "../../../store/auth-context";

function ProfileButton() {
    const authCtx = useContext(AuthContext);
    const navigator = useNavigate();

    const handleLogout = async () => {
        const token = authCtx.token;
        const res = await logoutUser(token);
        if (res.error) {
            alert(res.message);
        }
        else {
            authCtx.logout();
            navigator('/', { replace: true });  // redirect user after logout
        }
    }

    return (
        <div className="avatar">
            <Popover className="relative">
                <Popover.Button>
                    <div className="avatar__icon">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                    </div>
                </Popover.Button>

                <Popover.Panel className="absolute z-10">
                    <div className="grid grid-cols-1 bg-white shadow-2xl border-2 w-48 rounded-lg p-2">
                        <div className="my-2 flex justify-center items-center">
                            {`${titleCase(authCtx.user.name)}`}
                        </div>
                        <hr className="bg-black" />

                        <div className="mt-2 flex items-center justify-center ">
                            <button onClick={handleLogout} className='text-red-500'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                            </button>
                        </div>

                    </div>
                </Popover.Panel>
            </Popover>
        </div>
    );
}

export function AuthLink(props) {
    return (
        <>
            {
                !props.isLoggedIn
                &&
                <Link to='/signup'>
                    <div className="flex p-2">
                        <div className="mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                        </div>
                        Sign Up
                    </div>
                </Link>

            }

            {
                !props.isLoggedIn
                &&
                <Link to='/login'>
                    <div className="flex p-2 bg-amber-400 hover:bg-amber-300 transition-all rounded-2xl">
                        <div className="mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                        </div>
                        Login
                    </div>
                </Link>
            }
            {
                props.isLoggedIn
                &&
                // <div
                //     onClick={props.logoutHandler}
                //     className='cursor-pointer flex p-2 bg-rose-500 hover:bg-rose-400 rounded-2xl'
                // >
                //     <div>
                //         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                //             <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                //         </svg>
                //     </div>
                //     <div className="ml-2">
                //         Logout
                //     </div>
                // </div>
                <ProfileButton />
            }
        </>
    )
}