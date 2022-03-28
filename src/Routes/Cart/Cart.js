import { useContext, useEffect, useState } from "react";
import { getCartItems, calculateOrderPrice } from "../../utils/helper";
import { displayRazorpay } from "../../utils/razorpay";
import AuthContext from '../../store/auth-context';

import { ToppingCard } from '../../components/PizzaCard/ToppingCard/ToppingCard';


function PlaceOrder(props) {
    const handleOrderPlacement = async () => {
        displayRazorpay(props);
    }

    return (
        <>
            {
                <button onClick={handleOrderPlacement} className="bg-black text-white hover:-translate-y-1 transition flex justify-center items-center w-40 py-2 md:mr-10 rounded-full">
                    <div className="bg-amber-400 px-3 py-3 rounded-full mr-7 text-black font-bold text-lg">
                        Pay
                    </div>
                    <div className="font-bold text-xl">
                        {props.orderPrice}
                    </div>
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
    }, [isOrderPlaced])

    useEffect(() => {
        setPrice(calculateOrderPrice(items));
    }, [items])

    return (
        <>
            {/* <div>
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
            } */}
            <div className="cart p-5">
                <div className="menu__title text-4xl font-light mb-10">
                    <span className="font-medium">Your</span> Cart
                </div>

                {
                    items.length > 0
                        ?
                        <div className="cart__orderPrice flex md:justify-end items-center mb-5 md:mb-10">
                            <div>
                                <PlaceOrder token={authCtx.token} setIsOrderPlaced={setIsOrderPlaced} orderPrice={price} />
                            </div>
                        </div>
                        :
                        <strong>Cart is Empty</strong>
                }
                <div className="cart__items grid grid-cols-1 md:grid-cols-4">
                    {

                        items.map(item => {
                            return (
                                <div className="pizza shadow-2xl rounded-3xl md:mx-3 mb-5 p-2">
                                    <div className="flex justify-between items-center p-2">
                                        <div className="text-red-500 hover:-translate-y-1 transition">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="text-lime-500 text-lg ">
                                            x<span className="text-2xl">{item.quantity}</span>
                                        </div>
                                    </div>

                                    <div className="pizza__image p-3 mb-2">
                                        <img className="h-48 w-full" src='' alt='' />
                                    </div>

                                    <div className="pizza__name flex justify-center items-center font-bold text-lg text-gray-800 mb-1">
                                        {item.item.name} <span className="ml-2 font-light">({item.item.crustType})</span>
                                    </div>

                                    <div className="pizza__price flex justify-center items-center text-base">
                                        <span className="mr-1">₹</span>{`${item.item.price}.00 `}
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </>
    );
}