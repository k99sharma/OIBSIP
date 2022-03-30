import { useContext, useEffect, useState } from "react";
import { getCartItems, calculateOrderPrice, deleteItemFromCart } from "../../utils/helper";
import { displayRazorpay } from "../../utils/razorpay";
import AuthContext from '../../store/auth-context';
import { useNavigate } from "react-router-dom";

function EmptyCart() {
    const navigator = useNavigate();

    return (
        <div className="emptyCart grid grid-cols-1 justify-items-center items-center">
            <div className="mb-5">
                <img className="w-52 h-52" src='/emptyCart.png' alt='empty cart' />
            </div>

            <div className="text-4xl font-bold mb-10">
                Oops! Your cart is empty!
            </div>

            <button onClick = { () => { navigator('/menu')} }>
                <div className="mb-5 bg-amber-400 p-3 rounded-full flex items-center justify-center animate-bounce">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                    </svg>
                </div>
            </button>
        </div>
    )
}

function Pay(props) {
    const handleOrderPlacement = async () => {
        displayRazorpay(props);
    }

    return (
        <>
            {
                <button onClick={handleOrderPlacement} className="bg-lime-300 hover:bg-lime-400 text-lime-800 shadow-md text-white hover:-translate-y-1 transition flex justify-center items-center w-40 py-2 md:mr-10 rounded-md">
                    <div className="text-xl font-bold flex items-center justify-center mx-2">
                        Pay ₹
                    </div>
                    <div className="font-bold text-xl">
                        {props.orderPrice}
                    </div>
                </button>
            }
        </>
    )
}

function DeleteButton(props) {
    const handleDelete = async (e) => {
        e.preventDefault();
        props.deleteItem(props.item._id);
    }

    return (
        <>
            <button onClick={handleDelete} className="pizza__delete">
                <div className="text-red-500 hover:-translate-y-1 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                </div>
            </button>
        </>
    );
}

export default function Cart() {
    const [items, setItems] = useState([]);
    const [price, setPrice] = useState(0);
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);
    const [isItemDeleted, setIsItemDeleted] = useState(false);
    const authCtx = useContext(AuthContext);

    useEffect(() => {
        async function fetchCartItems(token) {
            const res = await getCartItems(token);
            if (res.error) {
                alert(res.message);
            } else {
                setItems(res.data);
            }

            setIsItemDeleted(false);
        }

        fetchCartItems(authCtx.token);
    }, [isOrderPlaced, isItemDeleted])

    useEffect(() => {
        setPrice(calculateOrderPrice(items));
    }, [items])


    const deleteItem = async (id) => {
        const res = await deleteItemFromCart(authCtx.token, id);
        if (res.error) {
            alert('Item not deleted');
        } else {
            alert('Item is deleted');
            setIsItemDeleted(true);
        }
    }

    return (
        <>
            <div className="cart p-5">
                <div className="menu__title text-4xl font-light mb-10">
                    <span className="font-medium">Your</span> Cart
                </div>

                {
                    items.length > 0
                        ?
                        <div className="cart__orderPrice flex md:justify-end items-center mb-5 md:mb-10">
                            <div>
                                <Pay token={authCtx.token} user = {authCtx.user} setIsOrderPlaced={setIsOrderPlaced} orderPrice={price} />
                            </div>
                        </div>
                        :
                        <EmptyCart />
                }
                <div className="cart__items grid grid-cols-1 md:grid-cols-4">
                    {

                        items.map(item => {
                            return (
                                <div key={item._id} className="pizza shadow-2xl rounded-3xl md:mx-3 mb-5 p-2">
                                    <div className="flex justify-between items-center p-2">
                                        <DeleteButton deleteItem={deleteItem} item={item} />

                                        <div className="text-lime-500 text-lg ">
                                            x<span className="text-2xl">{item.quantity}</span>
                                        </div>
                                    </div>

                                    <div className="pizza__image p-3 mb-2">
                                        <img className="h-48 w-full" src={item.item.imageUrl} alt={item.item.name} />
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