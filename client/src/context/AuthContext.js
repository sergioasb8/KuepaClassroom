import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

function AuthContextProvider(props) {

    const [loggedIn, setLoggedIn] = useState(undefined);
    const [loggedUser, setLoggedUser] = useState("");

    async function getLoggedIn() {
        const loggedInRes = await axios.get("http://localhost:4000/api/users/loggedIn");
        setLoggedIn(loggedInRes.data);
    }

    useEffect(() => {
        getLoggedIn();
    }, []);

    const getLoggedUser = (user) => {
        setLoggedUser(user);
    }

    return (
        <AuthContext.Provider value={{loggedIn, getLoggedIn, getLoggedUser, loggedUser}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
export {AuthContextProvider};
