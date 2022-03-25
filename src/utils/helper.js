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
    .then(data => data.json);
}