// importing built-in components
import { Link } from 'react-router-dom';

// routes1 list
const routesList1 = [{
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

// routes2 list
const routesList2 = [{
    url: '/menu',
    name: 'Menu'
},];

// routes to show before authenticated
const routesBeforeAuthentication = routesList1.map(route => {
    return (
        <li key={route.name} className='navbar__link'>
            <Link to={route.url}>
                {route.name}
            </Link>
        </li>
    )
})

// routes to show after authentication
const routesAfterAuthentication = routesList2.map(route => {
    return (
        <>
            <li key={route.name} className='navbar__link'>
                <Link to={route.url}>
                    {route.name}
                </Link>
            </li>

            <li>
                Logout
            </li>
        </>
    )
})


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
                {
                    props.token
                        ?
                    routesBeforeAuthentication
                        :
                    routesAfterAuthentication
                }
            </ul>
        </div>
    );
}

export default Navbar;