import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";

export function BuyNowButton() {
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;
    const navigator = useNavigate();

    const handleClick = () => {
        // if logged in redirect to menu page
        if(isLoggedIn)
            navigator('/menu');
        // else redirect to login page
        else
            navigator('/login');
    }

    return (
        <>
            <button onClick = {handleClick} className="flex p-2 rounded-3xl items-center justify-items-center bg-black">
                <div className="mx-2 bg-amber-400 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                    </svg>
                </div>
                <div className="mx-5 text-white">
                    Buy Now
                </div>
            </button>
        </>
    );
}