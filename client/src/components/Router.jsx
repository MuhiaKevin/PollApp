import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom"
import App from "../App"
import VotePage from "./Votepage"


const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={App} exact />
                <Route path="/vote/:id" component={VotePage} />
            </Switch>
        </BrowserRouter>
    );
};

export default Router;