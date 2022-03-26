import { useContext, useEffect, useState } from "react";
import { getCartItems } from "../../utils/helper";
import AuthContext from '../../store/auth-context';

export default function Cart(){
    const [cart, setCart] = useState([]);
    const authCtx = useContext(AuthContext);

    useEffect(() => {
        async function fetchCartItems(token){
            const res = await getCartItems(token);
            if(res.error){
                alert(res.message);
            }else{
                setCart(res.data);
                console.log(res.data);
            }
        }

        fetchCartItems(authCtx.token);
    }, [])

    return(
        <>
            <strong>CART PAGE</strong>
        </>
    );
}