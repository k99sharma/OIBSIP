// importing css
import './Navbar.css';

import { useContext } from "react";
import { useNavigate } from "react-router-dom";


import AuthContext from '../../store/auth-context';
import { logoutUser } from "../../utils/helper";
import { Banner } from './Banner/Banner';
import { AuthLink } from './AuthLink/AuthLink';
import { MenuLink } from './MenuLink/MenuLink';


export default function Navbar() {
    const navigator = useNavigate();
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;
    const role = authCtx.user.role;

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
        <div className='navbar h-24 items-center flex justify-around my-3 md:my-6 p-5 md:px-28 md:py-5'>
            <Banner />

            <div className='menuLinks flex md:flex-grow md:w-5/12 ml-10'>
                <MenuLink isLoggedIn={isLoggedIn} role={role} />
            </div>

            <div className='authLinks flex md:w-2/12 justify-around'>
                <AuthLink handler={handleLogout} isLoggedIn={isLoggedIn} />
            </div>
            <br />
        </div>
    );
}