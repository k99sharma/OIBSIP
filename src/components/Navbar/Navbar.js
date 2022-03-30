// importing css
import './Navbar.css';

import { useContext, useState } from "react";


import AuthContext from '../../store/auth-context';
import { Banner } from './Banner/Banner';
import { AuthLink } from './AuthLink/AuthLink';
import { MenuLink } from './MenuLink/MenuLink';


export default function Navbar() {
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;
    const role = authCtx.user.role;

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className='navbar h-24 items-center flex justify-around p-5 md:px-28 md:py-5'>
                <Banner />

                <button className='md:hidden ml-28' onClick={() => { isOpen === false ? setIsOpen(true) : setIsOpen(false) }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                </button>

                <div className='menuLinks hidden md:flex md:flex-grow md:w-5/12 ml-10'>
                    <MenuLink isLoggedIn={isLoggedIn} role={role} />
                </div>

                <div className='authLinks hidden md:flex md:w-2/12 justify-around'>
                    <AuthLink isLoggedIn={isLoggedIn} />
                </div>
                <br />
            </div>

            <div className={`flex flex-col justify-center items-center mb-2 transition-all md:hidden ${!isOpen && `hidden`}`}>
                <div>
                    <MenuLink isLoggedIn={isLoggedIn} role={role} />
                </div>

                <div>
                    <AuthLink isLoggedIn={isLoggedIn} />
                </div>
            </div>
        </>
    );
}