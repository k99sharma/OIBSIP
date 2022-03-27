import { useEffect, useContext, useState } from "react";
import AuthContext from "../../store/auth-context";

import { getMenu, addItemToCart } from "../../utils/helper";

// add to cart button 
function AddToCart(props) {
    const [quantity, setQuantity] = useState(0);
    const [isAddedToCart, setIsAddedToCart] = useState(false);

    useEffect(() => {
        if (isAddedToCart === true) {
            setQuantity(0);
            setIsAddedToCart(false);
        }
    }, [isAddedToCart])


    const handleAddToCart = async () => {
        if(quantity === 0){
            alert('Please select quantity');
            return;
        }
        const res = await addItemToCart(props.token, props.itemId, quantity);

        if (res.error) {
            alert(res.message);
        } else {
            alert('Item added in cart');
            setIsAddedToCart(true);
        }
    }

    const increaseQuantity = () => {
        let newQuantity = quantity + 1;
        if (newQuantity > 10)
            newQuantity = 10;

        setQuantity(newQuantity);
    }

    const decreaseQuantity = () => {
        let newQuantity = quantity - 1;
        if (newQuantity < 0)
            newQuantity = 0;

        setQuantity(newQuantity);
    }

    return (
        <div className="flex justify-around my-3">
            <button onClick={handleAddToCart}>
                <div>
                    <img className="h-10 w-10 hover:-translate-y-1 transition" src='/addToCart.png' alt='add to cart' />
                </div>
            </button>

            <div className="quantityButton flex">
                <button onClick={increaseQuantity}>
                    <div className="quantityButton__increase hover:-translate-y-1 transition text-lime-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                        </svg>
                    </div>
                </button>
                <div className="quantityButton__quantity border-2 border-gray-800 flex justify-center items-center rounded-full px-2 mx-2 font-bold text-lg">
                    {quantity}
                </div>
                <button onClick={decreaseQuantity}>
                    <div className="quantityButton__decrease hover:-translate-y-1 transition text-red-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                        </svg>
                    </div>
                </button>
            </div>
        </div>
    );
}

function ToppingCard(props){
    return(
        <div className="mx-2 bg-gray-300 p-1 shadow-md text-sm rounded-md">
        {props.topping.name}
        </div>
    );
}

function PizzaCard(props) {
    return (
        <div className="pizza shadow-2xl rounded-3xl md:mx-3 mb-5 p-2">
            <div className="pizza__image p-3 mb-2">
                <img className="h-48 w-full" src='' alt='' />
            </div>

            <div className="pizza__name flex justify-center items-center font-bold text-lg text-gray-800 mb-1">
                {props.item.name} <span className="ml-2 font-light">({ props.item.crustType })</span>
            </div>

            <div className="pizza__price flex justify-center items-center text-base mb-3">
                <span className="mr-1">₹</span>{`${props.item.price}.00`}
            </div>

            <div className="pizza__toppings mb-3 px-2 flex">
                {
                    props.item.toppings.map(topping => {
                        return <ToppingCard topping={topping} />
                    })
                }
            </div>

            <hr />
            <div className="pizza__add mb-1">
                <AddToCart itemId={props.item._id} token={props.token} />
            </div>
        </div>
    );
}


export default function Menu() {
    const [menuItems, setMenuItems] = useState([]);
    const authCtx = useContext(AuthContext);

    // runs whenever user go to menu page
    useEffect(() => {
        async function menu() {
            // fetch menu data
            const res = await getMenu(authCtx.token);

            if (res.error) {
                alert('No pizzas available');
            } else {
                setMenuItems(res.data);
            }
        }

        menu();
    }, [])

    return (
        <>
            <div className="menu p-5">
                <div className="menu__title text-4xl font-light mb-10">
                    <span className="font-medium">Featured</span> Pizzas
                </div>

                <div className="menu__list grid grid-cols-1 md:grid-cols-4 my-5 p-3">
                    {
                        menuItems.map(item => {
                            return <PizzaCard key={item.name} item={item} token={authCtx.token} />
                        })
                    }
                </div>
            </div>
        </>
    );
}