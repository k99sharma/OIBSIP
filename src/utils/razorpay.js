import { verifyPayment, clearCart, placeOrder } from "./helper";

const RZP_KEY_ID = process.env.REACT_APP_RZP_KEY_ID;

// razorpay checkout script
export function loadScript(src) {
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

// function to display razorpay payment window
export const displayRazorpay = async (props) => {
    const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
    }

    // creating a new order
    const order = await placeOrder(props.orderPrice, props.token);

    if (order.error) {
        alert("Server error. Are you online?");
        return;
    }

    // getting order details
    const { id, amount, currency } = order.data;

    const options = {
        key: RZP_KEY_ID,
        amount: amount.toString(),
        currency: currency,
        name: "Mount Pizza",
        description: "Pizza Order",
        image: '/logo512.png',
        order_id: id,
        handler: async function (response) {
            const data = {
                orderCreationId: id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
            };
            const paymentStatus = await verifyPayment(props.token, data);
            // if payement failed
            if (paymentStatus.error) {
                alert('Payment Failed!');
                return;
            }

            // payement is successful
            const res = await clearCart(props.token);
            if (res.error) {
                alert('Order is not placed!');
            }
            alert('Order is placed!');
            props.setIsOrderPlaced(true);
        },
        prefill: {
            name: "Karl Urban",
            email: "karl@gmail.com",
        },
        theme: {
            color: "#fbbf24",
        },
    };

    // creating razorpay payment window
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
}