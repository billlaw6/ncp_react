import React from 'react';
// import { Route, Switch } from 'react-router-dom';
import Home from '../pages/home';
import Login from '../pages/login';
import Dicom from '../pages/dicom';
import ToDo from '../pages/todo';
import Counter from '../pages/counter';
import Canvas from '../pages/canvas';

const routes = [
    { path: "/", name: "Home", component: Home },
    { path: "/login", name: "Login", component: Login },
    { path: "/dicom", name: "dicom", component: Dicom },
];

export default routes;
