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

/* 
 * 1. 函数式定义的无状态组件
 * 2. es5原生方式React.createClass定义的组件
 * 3. es6形式的extends React.Component定义的组件
 * 只要有可能，尽量使用无状态组件创建形式，
 * 否则（如需要state，生命周期方法等），则使用'React.Component'这种es6形式创建组件。
 */
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
