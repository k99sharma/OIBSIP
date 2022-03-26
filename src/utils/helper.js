// function to login user
export const loginUser = async (credentails) => {
    return fetch('http://localhost:8000/mountpizza/auth/login', {
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
    return fetch('http://localhost:8000/mountpizza/users/create', {
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
    return fetch('http://localhost:8000/mountpizza/auth/logout', {
        method: 'POST',
        headers: {
            'x-auth-token': token,
        }
    })
    .then(data => data.json());
}

// function to fetch menu data
export const getMenu = async (token) => {
    return fetch('http://localhost:8000/mountpizza/items/pizzas/getAll', {
        method: 'GET',
        headers: {
            'x-auth-token': token,
        }
    })
    .then(data => data.json());
}


// function to add item in cart
export const addItemToCart = async (token, itemId, quantity) => {
    return fetch(`http://localhost:8000/mountpizza/cart/add?itemId=${itemId}&quantity=${quantity}`, {
        method: 'POST',
        headers: {
            'x-auth-token': token,
        }
    })
    .then(data => data.json());
} 

// function to fetch cart items 
export const getCartItems = async (token) => {
    return fetch('http://localhost:8000/mountpizza/cart/getAll', {
        method: 'GET',
        headers: {
            'x-auth-token': token,
        }
    })
    .then(data => data.json());
}