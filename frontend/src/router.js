import React from 'react';
import { Route } from 'react-router-dom';
import MainPage from './Components/MainPage';
import {Podstrona} from './Components/podstrona';
export default (
    <React.Fragment>​
        <Route exact path="/" component={MainPage} myname={"Main page"}/>
        <Route path="/podstrona" component={Podstrona} name = "podstrona 1" />
    </React.Fragment>
);