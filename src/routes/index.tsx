import React from 'react';
// import { Route, Switch } from 'react-router-dom';
import Login from '../pages/login';
import Home from '../pages/home';
import ToDo from '../pages/todo';
import Counter from '../pages/counter';
import Canvas from '../pages/canvas';

const routes = [
    { path: "/login", name: "Login", component: Login },
    { path: "/", name: "Home", component: Home }
];

export default routes;
