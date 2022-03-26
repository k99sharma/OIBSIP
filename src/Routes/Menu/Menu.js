import { useEffect, useContext, useState } from "react";
import AuthContext from "../../store/auth-context";

import { getMenu } from "../../utils/helper";


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
                            <br />
                        </div>
                    )
                })
            }
        </>
    );
}