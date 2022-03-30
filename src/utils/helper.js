// function to login user
export const loginUser = async (credentails) => {
    return fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentails),
    })
    .then(res => res.json())
}

// function to signup user
export const signupUser = async (credentails) => {
    return fetch(`${process.env.REACT_APP_API_URL}/users/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentails),
    })
    .then(res => res.json())
}


// function to logout user
export const logoutUser = async (token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/auth/logout`, {
        method: 'POST',
        headers: {
            'x-auth-token': token,
        }
    })
    .then(data => data.json());
}

// function to fetch menu data
export const getMenu = async (token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/items/pizzas/getAll`, {
        method: 'GET',
        headers: {
            'x-auth-token': token,
        }
    })
    .then(data => data.json());
}


// function to add item in cart
export const addItemToCart = async (token, itemId, quantity) => {
    return fetch(`${process.env.REACT_APP_API_URL}/cart/add?itemId=${itemId}&quantity=${quantity}`, {
        method: 'POST',
        headers: {
            'x-auth-token': token,
        }
    })
    .then(data => data.json());
} 

// function to fetch cart items 
export const getCartItems = async (token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/cart/getAll`, {
        method: 'GET',
        headers: {
            'x-auth-token': token,
        }
    })
    .then(data => data.json());
}


// function to calculate order price
export const calculateOrderPrice = (items) => {
    let price = 0;

    for (let i = 0; i < items.length; i++) {
        price += (items[i].item.price * items[i].quantity);
    }

    return price;
}


// function to place order 
export const placeOrder = async (amount, token) => {
    const data = await fetch(`${process.env.REACT_APP_API_URL}/orders/create?orderPrice=${amount}`, {
        method: 'POST',
        headers: {
            'x-auth-token': token
        }
    })
    return await data.json()
}


// function to verify payment
export const verifyPayment = async (token, data) => {
    return fetch(`${process.env.REACT_APP_API_URL}/orders/payment/verify`, {
        method: 'POST',
        headers: {
            'x-auth-token': token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(data => data.json());
}


// function to clear cart 
export const clearCart = (token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/cart/clearAll`, {
        method: 'DELETE',
        headers: {
            'x-auth-token': token,
        }
    })
    .then(data => data.json());
}



// function to delete item from cart
export const deleteItemFromCart = (token, id) => {
    return fetch(`${process.env.REACT_APP_API_URL}/cart/delete?itemId=${id}`, {
        method: 'DELETE',
        headers: {
            'x-auth-token': token,
        }
    })
    .then(data => data.json());
}

// function to convert text into title case
export const titleCase = (str) => {
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
    }
    return str.join(' ');
}


// function to get all user data
export const getAllUsers = (token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/users/getAll`, {
        method: 'GET',
        headers: {
            'x-auth-token': token,
        }
    })
    .then(data => data.json());
}

// function to make user admin
export const makeAdmin = (token, id) => {
    return fetch(`${process.env.REACT_APP_API_URL}/users/${id}/makeAdmin`, {
        method: 'PUT',
        headers: {
            'x-auth-token': token,
        }
    })
    .then(data => data.json());
}

// function to fetch all toppings
export const getAllToppings = (token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/items/toppings/getAll`, {
        method: 'GET',
        headers: {
            'x-auth-token': token,
        }
    })
    .then(data => data.json());
}

// function to delete topping
export const deleteTopping = (token, id) => {
    return fetch(`${process.env.REACT_APP_API_URL}/items/toppings/${id}/delete`, {
        method: 'DELETE',
        headers: {
            'x-auth-token': token,
        }
    })
    .then(data => data.json());
}

// function to create topping
export const createTopping = (token, data) => {
    return fetch(`${process.env.REACT_APP_API_URL}/items/toppings/create`, {
        method: 'POST',
        headers: {
            'x-auth-token': token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(data => data.json());
}


// function to get all pizzas
export const getAllPizzas = (token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/items/pizzas/getAll`, {
        method: 'GET',
        headers: {
            'x-auth-token': token,
        }
    })
    .then(data => data.json())
}


// function to delete topping
export const deletePizza = (token, id) => {
    return fetch(`${process.env.REACT_APP_API_URL}/items/pizzas/${id}/delete`, {
        method: 'DELETE',
        headers: {
            'x-auth-token': token,
        }
    })
    .then(data => data.json());
}

// function to create topping
export const createPizza = (token, data) => {
    return fetch(`${process.env.REACT_APP_API_URL}/items/pizzas/create`, {
        method: 'POST',
        headers: {
            'x-auth-token': token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(data => data.json());
}

// function to correct topping labels
export const correctToppingFormat = (data) => {
    const result = [];

    for(let i=0; i<data.length; i++){
        const temp = {
            value: data[i].name.toLowerCase(),
            label: titleCase(data[i].name),
        }

        result.push(temp);
    }

    return result;
}


// function to convert topping name to id
export const formatToppingNameToId = (toppings, data) => {
    const result = [];

    for(let i=0; i<toppings.length; i++){
        for(let option=0; option<data.length; option++){
            if(toppings[i].value.toLowerCase() === data[option].name.toLowerCase())
                result.push(data[option]._id);
        }
    }


    return result;
}