import { useState, useEffect } from 'react';
import { addItemToCart } from '../../../utils/helper';

// add to cart button 
export function AddToCartButton(props) {
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