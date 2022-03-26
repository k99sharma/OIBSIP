import { useContext, useEffect, useState } from "react";
import { getCartItems } from "../../utils/helper";
import AuthContext from '../../store/auth-context';

import { calculateOrderPrice } from "../../utils/helper";


function PlaceOrder(){
    const handleOrder = () => {
        alert('Order Placed');
    }

    return(
        <>
            <button onClick = {handleOrder}>
                Place Order
            </button>
        </>
    )
}

export default function Cart() {
    const [items, setItems] = useState([]);
    const [price, setPrice] = useState(0);
    const authCtx = useContext(AuthContext);

    useEffect(() => {
        async function fetchCartItems(token) {
            const res = await getCartItems(token);
            if (res.error) {
                alert(res.message);
            } else {
                setItems(res.data);
            }
        }

        fetchCartItems(authCtx.token);
    }, [])

    useEffect(() => {
        setPrice(calculateOrderPrice(items));
    }, [items])

    return (
        <>
            <div>
                <strong>CART PAGE</strong>
            </div><br />


            {
                items.map(item => {
                    return (
                        <div key={item._id}>
                            <div>
                                <strong>
                                    {item.item.name}
                                </strong>
                            </div>
                            <br />
                        </div>
                    );
                })
            }

            <div>
                <strong>Order Price: </strong> {price}
            </div>

            <div>
                <PlaceOrder />
            </div>
        </>
    );
}