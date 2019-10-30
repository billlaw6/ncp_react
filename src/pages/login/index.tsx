import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb: any) {
        fakeAuth.isAuthenticated = true;
        setTimeout(cb, 100); // fake async
    },
    signout(cb: any) {
        fakeAuth.isAuthenticated = false;
        setTimeout(cb, 100);
    },
};

// export default class Login extends React.Component {
export default function Login() {
    let history = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: '/' } };
    let login = () => {
        fakeAuth.authenticate(() => {
            // debugger;
            console.log(from);
            history.replace(from);
        });
    };

    return (
        <div>
            <p>You must log in to view the page at {from.pathname}</p>
            <button onClick={login}>Log in</button>
        </div>
    );
}
