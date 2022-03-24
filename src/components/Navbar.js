// importing built-in components
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


// navbar component
function Navbar(props) {
    return (
        <div className="navbar">
            {/* Banner */}
            <Link to='/'>
                <strong>Mount Pizza</strong>
            </Link>

            {/* getting routes list */}
            <ul>
                <li className='navbar__link'>
                    <Link to='/menu'>
                        Menu
                    </Link>
                </li>

                <li className='navbar__link'>
                    <Link to='/login'>
                        Login
                    </Link>
                </li>

                <li className='navbar__link'>
                    <Link to='/signup'>
                        Signup
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default Navbar;