import { useEffect, useContext, useState } from "react";
import AuthContext from "../../store/auth-context";

import { getMenu } from "../../utils/helper";

// importing components
import { PizzaCard } from "../../components/PizzaCard/PizzaCard";

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