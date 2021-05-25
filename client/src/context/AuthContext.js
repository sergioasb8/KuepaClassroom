import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

function AuthContextProvider(props) {

    const [loggedIn, setLoggedIn] = useState(undefined);

    async function getLoggedIn() {
        const loggedInRes = await axios.get("http://localhost:4000/api/users/loggedIn");
        setLoggedIn(loggedInRes.data);
    }

    useEffect(() => {
        getLoggedIn();
    }, []);

    return (
        <AuthContextProvider value={{loggedIn, getLoggedIn}}>
            {props.children}
        </AuthContextProvider>
    )
}

export default AuthContext;
export {AuthContextProvider};
