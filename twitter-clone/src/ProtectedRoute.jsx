import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import auth from './auth';

const ProtectedRoute = ({component: Component, ...rest}) => {
    // console.log(rest.isLoggedin);
    return (
        <Route {...rest} render={(props) => {
            if(auth.isAuthenticated().then(res => res)){
                return <Component {...props}/>
            } else {
                auth.isAuthenticated().then(res => console.log("redirect to login in protected route ", res));
                return <Redirect to={'/login'}/>
            }
        }}/>
    )
}

export default ProtectedRoute;