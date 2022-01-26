import React from 'react';
import {Redirect, Route} from "react-router-dom";

const PrivateRouter = props => {
    const firstLogin = localStorage.getItem('firstLogin')
    return firstLogin ? <Route {...props}/> : <Redirect to={'/'}/>
    // return firstLogin ? <Route path={path} component={component}/> : <Redirect to={'/'}/>
};

export default PrivateRouter;