import React from 'react';
// import { createBrowserHistory } from 'history';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    useHistory,
    useLocation,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from './login';
import Home from './home';
import Canvas from './canvas';
import Edit from './edit';

const fakeAuth = {
    isAuthenticated: true,
    authenticate(cb: any) {
        fakeAuth.isAuthenticated = true;
        setTimeout(cb, 100); // fake async
    },
    signout(cb: any) {
        fakeAuth.isAuthenticated = false;
        setTimeout(cb, 100);
    },
};

function PrivateRoute({ children, ...rest }: any) {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                fakeAuth.isAuthenticated ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
}

// let history = createBrowserHistory();

export default function routerConfig() {
    return (
        <Router>
            <div>
                {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
                <Switch>
                    <Route path="/login" component={Login}></Route>
                    <PrivateRoute path="/canvas">
                        <Canvas />
                    </PrivateRoute>
                    <Route path="/edit" component={Edit}></Route>
                    <Route exact path="/" component={Home}></Route>
                </Switch>
            </div>
        </Router>
    );
}
