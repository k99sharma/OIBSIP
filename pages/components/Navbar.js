// imports
import Link from "next/link";

export default function Navbar(){
    return(
        <>
            <div>
                <strong>
                    Mount Pizza
                </strong>
            </div>
            <br />
            <div>
                <ul>
                    <li>
                        <Link href='/signup'>
                            Signup
                        </Link>
                    </li>

                    <li>
                        <Link href='/login'>
                            Login
                        </Link>
                    </li>

                    <li>
                        <Link href='menu'>
                            Menu
                        </Link>
                    </li>
                </ul>
            </div>
        </>    
    )
}