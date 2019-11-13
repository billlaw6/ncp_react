import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import Routes from './routes';
import { routerActions } from 'connected-react-router';

class App extends React.Component {
    constructor(props: any) {
        super(props)
    }
    render() {
        return (
            <Router>
                <Switch>
                    {
                        Routes.map((item, index) => {
                            return <Route key={item.name} path={item.path} exact component={item.component} />
                        })
                    }
                </Switch>
            </Router>
        )
    }
}

export default App;
