import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Class } from '../pages/class/Class';
import { Login } from '../pages/login/Login';
import { SignUp } from '../pages/signup/SignUp';
import AuthContext from '../context/AuthContext';

export const Router = () => {

    const { loggedIn } = useContext(AuthContext);

    return (
        <BrowserRouter>
            <Switch>
                {
                    loggedIn === false && (
                        <>
                            <Route exact path="/" component={Login} />
                            <Route exact path="/signup" component={SignUp} />
                            <Redirect to="/" />
                        </>
                    )
                }
                {
                    loggedIn === true && (
                        <>
                            <Route exact path="/class" component={Class} />
                            <Redirect to="/class" />
                        </>
                    )
                }
            </Switch>
        </BrowserRouter>
    )
}
