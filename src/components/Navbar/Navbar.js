import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from '../../store/auth-context';
import { logoutUser } from "../../utils/helper";


export default function Navbar() {
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;

    const handleLogout = async () => {
        const token = authCtx.token;
        const res = await logoutUser(token);
        if(res.error){
            alert(res.message);
        }
        else{
            authCtx.logout();
        }
    }

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
                        <button onClick={handleLogout}>
                            Logout
                        </button>
                    </li>
                }
            </ul>
        </>
    );
}