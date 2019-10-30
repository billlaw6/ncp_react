import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useRouteMatch,
	useHistory,
    useParams,
} from 'react-router-dom';

export default class Login extends React.Component {
	// let history = useHistory();
	// let location = useLocation();

	// let { from } = location.state || { from: { pathname: "/" }};
	// let login = () => {
	// 	fakeAuth.authenticate(() => {
	// 		history.replace(from);
	// 	});
	// };
    render() {
        return (
            <div>
                <a href="/">Go Home</a>
            </div>
        );
    }
}
