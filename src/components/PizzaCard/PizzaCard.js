// importing components
import { ToppingCard } from "./ToppingCard/ToppingCard";
import { AddToCartButton } from './AddToCardButton/AddToCardButton';

export function PizzaCard(props) {
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

            <div className="pizza__toppings mb-3 px-2 flex grid-cols-3">
                {
                    props.item.toppings.map(topping => {
                        return <ToppingCard key={topping._id} topping={topping} />
                    })
                }
            </div>

            <hr />
            <div className="pizza__add mb-1">
                <AddToCartButton itemId={props.item._id} token={props.token} />
            </div>
        </div>
    );
}