import { useContext, useEffect, useState } from "react";
import { getCartItems, calculateOrderPrice } from "../../utils/helper";
import { displayRazorpay } from "../../utils/razorpay";
import AuthContext from '../../store/auth-context';


function PlaceOrder(props) {
    const handleOrderPlacement = async () => {
        displayRazorpay(props);
    }

    return (
        <>
            {
                <button onClick={handleOrderPlacement}>
                    {`Pay ${props.orderPrice}`}
                </button>
            }
        </>
    )
}

export default function Cart() {
    const [items, setItems] = useState([]);
    const [price, setPrice] = useState(0);
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);
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

    useEffect(() => {}, [isOrderPlaced])

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

            {
                items.length > 0
                ?
                <>
                    <div>
                        <strong>Order Price: </strong> {price}
                    </div>

                    <div>
                        <PlaceOrder token={authCtx.token} setIsOrderPlaced={setIsOrderPlaced} orderPrice={price} />
                    </div>
                </>
                :
                <>
                    <div>
                        <strong>CART IS EMPTY</strong>
                    </div>
                </>
            }
        </>
    );
}