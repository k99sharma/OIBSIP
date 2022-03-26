import { useContext, useEffect, useState } from "react";
import { getCartItems, verifyPayment } from "../../utils/helper";
import AuthContext from '../../store/auth-context';
import { calculateOrderPrice, placeOrder } from "../../utils/helper";

const RZP_KEY_ID = 'rzp_test_lAIUDkdEDcflFM';


function PlaceOrder(props) {
    // const [orderId, setOrderId] = useState(null);

    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    const displayRazorpay = async () => {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        // creating a new order
        const order = await placeOrder(props.orderPrice, props.token);

        console.log(order);
        if (order.error) {
            alert("Server error. Are you online?");
            return;
        }

        // getting order details
        const {id, amount, currency} = order.data;

        const options = {
            key: RZP_KEY_ID, 
            amount: amount.toString(),
            currency: currency,
            name: "Mount Pizza",
            description: "Test Transaction",
            order_id: id,
            handler: async function (response) {
                const data = {
                    orderCreationId: id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };
                const paymentStatus = await verifyPayment(props.token, data);
                console.log(paymentStatus);
            },
            prefill: {
                name: "Karl Urban",
                email: "karl@gmail.com",
            },
            theme: {
                color: "#61dafb",
            },
        };

        // creating razorpay payment window
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    return (
        <>
            {
                <button onClick={displayRazorpay}>
                    {`Pay ${props.orderPrice}`}
                </button>
            }
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
                <PlaceOrder token={authCtx.token} orderPrice={price} />
            </div>
        </>
    );
}