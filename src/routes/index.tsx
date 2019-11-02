import React from 'react';
import { Route, Switch } from 'react-router';
import Home from '../containers/home';
// import Edit from '../containers/edit';
import Counter from '../containers/counter';
import Canvas from '../containers/canvas';

const routes = (
    <div>
        <Switch>
            <route exact path="/" component={Home} />
            // <route path="/edit" component={Edit} />
            <route path="/counter" component={Counter} />
            <route path="/canvas" component={Canvas} />
        </Switch>
    </div>
);

export default routes;
