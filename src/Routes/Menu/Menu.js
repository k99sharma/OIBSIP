import { useEffect, useContext, useState } from "react";
import AuthContext from "../../store/auth-context";

import { getMenu, addItemToCart } from "../../utils/helper";

// add to cart button 
function AddToCart(props){
    const [quantity, setQuantity] = useState(0);
    const [isAddedToCart, setIsAddedToCart] = useState(false);

    useEffect(()=>{
        if(isAddedToCart === true){
            setQuantity(0);
            setIsAddedToCart(false);
        }
    }, [isAddedToCart])
    
    
    const handleAddToCart = async () => {
        const res = await addItemToCart(props.token, props.itemId, quantity);

        if(res.error){
            alert(res.message);
        }else{
            alert('Item added in cart');
            setIsAddedToCart(true);
        }
    }

    const increaseQuantity = () => {
        let newQuantity = quantity + 1;
        if(newQuantity > 10)
            newQuantity = 10;

        setQuantity(newQuantity);
    }

    const decreaseQuantity = () => {
        let newQuantity = quantity-1;
        if(newQuantity < 0)
            newQuantity = 0;

        setQuantity(newQuantity);
    }

    return(
        <>
            <button onClick={ handleAddToCart }>
                Add To Cart
            </button>

            <div>
                <button onClick={ increaseQuantity }>
                    +
                </button>
                Quantity: { quantity }
                <button onClick={ decreaseQuantity }>
                    -
                </button>
            </div>
        </>
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
            <h1>MENU PAGE</h1><br />

            {
                menuItems.map(item => {
                    return( 
                        <div key={item.name}>
                            <strong>{item.name}</strong>
                            <ul>
                                {
                                    item.toppings.map(topping => {
                                        return <li key={topping.name}> { topping.name }</li>
                                    })
                                }
                            </ul>
                            <div>
                                CRUST TYPE: {item.crustType}
                            </div>
                            <div>
                                Price: { item.price }
                            </div>
                            <div>
                                <AddToCart itemId = {item._id} token = {authCtx.token} />
                            </div>
                            <br />
                        </div>
                    )
                })
            }
        </>
    );
}