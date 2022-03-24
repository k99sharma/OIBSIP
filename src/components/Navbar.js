// importing built-in components
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

async function userLogout(token){
    return fetch('http://localhost:8080/mountpizza/auth/logout', {
        method: 'POST',
        headers: {
            'x-auth-token': token
        },
    })
    .then(data => data.json());
}

function Logout(props){
    const navigate = useNavigate();

    const handleLogout = async ()=>{
        const res = await userLogout(props.token);
        if(res.error){
            alert(res.message);
        }else{
            props.setToken(res.data);
            navigate('/');
        }
    }

    return(
        <>
            <button onClick={handleLogout}>
                Logout
            </button>
        </>
    );
}

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
                {
                    props.token === null || props.token.length === 0
                        ?
                        <>
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
                        </>

                        :
                        
                        <>
                            <Logout setToken = {props.setToken} token = {props.token} />
                        </>
                }

            </ul>
        </div>
    );
}

export default Navbar;