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
        component: Home
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/dicom',
        component: Dicom,
        routes: [
            {
                path: '/dicom/upload',
                component: DicomUploader,
            },
            {
                path: '/dicom/viewer',
                component: DicomViewer,
            },
        ]
    },
];

export default routes;
