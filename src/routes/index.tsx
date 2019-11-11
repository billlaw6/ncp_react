import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../containers/login';
import Home from '../containers/home';
import ToDo from '../containers/todo';
import Counter from '../containers/counter';
import Canvas from '../containers/canvas';

const routes = (
    <div>
        <Switch>
            <Route path="/todo" component={ToDo} />
            <Route path="/counter" component={Counter} />
            <Route path="/canvas" component={Canvas} />
            <Route path="/login" component={Login} />
            <Route exact path="/" component={Home} />
        </Switch>
    </div>
);

export default routes;
