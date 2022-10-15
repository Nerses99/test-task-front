import React from 'react'
import { Switch, Route, Redirect } from "react-router-dom";
import Login from '../pages/login';
import Register from '../pages/register';
import Home from '../pages/home';
import HomeLayout from '../layouts/home';

export default function Index() {
    return (
        <Switch  >
            <Route exact path="/login" component={() => (<HomeLayout><Login /></HomeLayout>)} />
            <Route exact path="/register" component={() => (<HomeLayout><Register /></HomeLayout>)} />
            <Route exact path="/home" component={() => (<HomeLayout><Home /></HomeLayout>)} />
            <Redirect to="/register" />
        </Switch>
    )
}

