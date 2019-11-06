import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../containers/home';
// import Edit from '../containers/edit';
import Counter from '../containers/counter';
import Canvas from '../containers/canvas';

const routes = (
    <div>
        <Switch>
            <Route exact path="/" component={Home} />
            {/*<Route path="/edit" component={Edit} /> */}
            <Route path="/counter" component={Counter} />
            <Route path="/canvas" component={Canvas} />
        </Switch>
    </div>
);

export default routes;
