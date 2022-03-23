// importing built-in components
import { Link } from 'react-router-dom';

// routes list
const routesList = [{
    url: '/menu',
    name: 'Menu'
},
{
    url: '/signup',
    name: 'Signup'
},
{
    url: '/login',
    name: 'Login',
}];


// getting components from routes list
const routes = routesList.map(route => {
    return <li className='navbar__link'>
        <Link to={route.url}>
            {route.name}
        </Link>
    </li>
})


// navbar component
function Navbar(){
    return(
        <div className="navbar">
            {/* Banner */}
            <Link to='/'>
                <strong>Mount Pizza</strong>
            </Link>
            
            {/* getting routes list */}
            <ul>{routes}</ul>
        </div>
    );
}

export default Navbar;