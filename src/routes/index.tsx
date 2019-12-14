import React from 'react';
// import { Route, Switch } from 'react-router-dom';
import Home from '../pages/home';
import Login from '../pages/login/login';
import Dicom from '../pages/dicom/dicom';
import Canvas from '../pages/canvas';
import DicomUploader from '../pages/dicom/components/DicomUploader';
import DicomViewer from '../pages/dicom/components/DicomViewer';

const routes = [
    {
        path: '/',
        exact: true,
        component: Home,
        routes: [],
    },
    {
        path: '/login',
        exact: true,
        component: Login,
        routes: [],
    },
    {
        path: '/dicom',
        exact: false,
        component: Dicom,
        routes: [
            {
                path: '/dicom/upload',
                exact: true,
                component: DicomUploader,
            },
            {
                path: '/dicom/viewer',
                exact: true,
                component: DicomViewer,
            },
        ]
    },
];

export default routes;
