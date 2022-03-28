// importing css
import './Navbar.css';

import { useContext } from "react";


import AuthContext from '../../store/auth-context';
import { Banner } from './Banner/Banner';
import { AuthLink } from './AuthLink/AuthLink';
import { MenuLink } from './MenuLink/MenuLink';


export default function Navbar() {
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;
    const role = authCtx.user.role;



    return (
        <div className='navbar h-24 items-center flex justify-around p-5 md:px-28 md:py-5'>
            <Banner />

            <div className='menuLinks flex md:flex-grow md:w-5/12 ml-10'>
                <MenuLink isLoggedIn={isLoggedIn} role={role} />
            </div>

            <div className='authLinks flex md:w-2/12 justify-around'>
                <AuthLink isLoggedIn={isLoggedIn} />
            </div>
            <br />
        </div>
    );
}