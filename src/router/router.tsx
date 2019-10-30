import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams,
} from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Canvas from '../pages/Canvas';

export default function routerConfig() {
    return (
        <Router>
            <div>
                {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
                <Switch>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/canvas" component={Canvas}></Route>
                    <Route exact path="/" component={Home}></Route>
                </Switch>
            </div>
        </Router>
    );
}
