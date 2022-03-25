import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from '../../store/auth-context';


export default function Navbar() {
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;


    return (
        <>
            <div>
                <Link to='/'>
                    <strong>Mount Pizza</strong>
                </Link>
            </div>

            <ul>
                {
                    !isLoggedIn
                    &&
                    <li>
                        <Link to='/login'>
                            Login
                        </Link>
                    </li>

                }

                {
                    !isLoggedIn
                    &&
                    <li>
                        <Link to='/signup'>
                            Signup
                        </Link>
                    </li>
                }
                {
                    isLoggedIn
                    &&
                    <li>
                        <Link to='/menu'>
                            Menu
                        </Link>
                    </li>
                }
                {
                    isLoggedIn
                    &&
                    <li>
                        Logout
                    </li>
                }
            </ul>
        </>
    );
}