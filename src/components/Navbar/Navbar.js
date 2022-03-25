import { Link } from "react-router-dom";

const links = [
{
    name: 'Login',
    path: '/login',
},
{
    name: 'Signup',
    path: '/signup',
},];

const navLinks = links.map(link => {
        return( 
        <li key={`${link.name}-link`}>
            <Link to={link.path}>
                {link.name}
            </Link>
        </li>
)});


export default function Navbar(){
    return(
        <>
            <div>
                <Link to='/'>
                    <strong>Mount Pizza</strong>
                </Link>
            </div>

            <ul>
                { navLinks }
            </ul>
        </>
    );
}