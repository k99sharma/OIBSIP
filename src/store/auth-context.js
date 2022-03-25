import React, { useEffect, useState } from 'react';

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: () => { },
    logout: () => { },
});

export const AuthContextProvider = (props) => {
    const [token, setToken] = useState(null);

    useEffect(() => {   
        // get token value on loading application
        const savedToken = localStorage.getItem('token');
        setToken(savedToken);
    }, [])

    const userIsLoggedIn = token === null ? false : true;

    const loginHandler = (token) => {
        setToken(token);
        // saving token in local storage
        alert('Logged In');
        localStorage.setItem('token', token);
    }

    const logoutHandler = () => {
        setToken(null);
        // set token in local storage as null
        alert('Logged Out!');
        localStorage.clear('token');
    }

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
    }

    return (
        <AuthContext.Provider value={ contextValue }>
            { props.children }
        </AuthContext.Provider>
    );
}


export default AuthContext;