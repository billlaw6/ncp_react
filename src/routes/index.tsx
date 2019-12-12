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
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/dicom',
        name: 'dicom',
        component: Dicom,
        routes: [
            // {
            //     path: '/dicom/upload',
            //     name: 'dicom-upload',
            //     component: DicomUploader,
            // },
            {
                path: '/dicom/viewer',
                name: 'dicom-viewer',
                component: DicomViewer,
            },
        ]
    },
];

export default routes;
