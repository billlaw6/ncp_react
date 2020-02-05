import React, { Component, ComponentType } from "react";

import Home from "_pages/home/index";
import Player from "_pages/player/Player";
import Login from "_pages/login/Login";
import Upload from "_pages/upload/Upload";

import DefaultLayout from "_layout/Default/Default";
import FullscreenLayout from "_layout/FullscreenLayout/FullscreenLayout";

import Oauth from "../pages/user/oauth";

export interface RoutesI {
  name: string;
  path: string;
  component: ComponentType<any>;
  exact?: boolean;
  routes?: RoutesI[];
  permission?: string[];
  layout?: typeof DefaultLayout | typeof FullscreenLayout; // 布局
}

const routes: RoutesI[] = [
  {
    name: "home",
    path: "/",
    exact: true,
    component: Home,
    permission: ["login"],
  },
  {
    name: "login",
    path: "/login",
    component: Login,
    layout: FullscreenLayout,
  },
  {
    name: "player",
    path: "/player",
    component: Player,
    permission: ["login"],
  },
  {
    name: "upload",
    path: "/upload",
    component: Upload,
    permission: ["login"],
  },
  {
    name: "logout",
    path: "/logout",
    component: Logout,
    routes: [],
  },
  {
    name: "oauth",
    path: "/oauth",
    component: Oauth,
    routes: [],
  },
  // {
  //   name: "exam index",
  //   path: "/exam",
  //   component: ExamIndexManage,
  //   routes: [],
  //   permission: ["login"],
  // },
  // {
  //   name: "dicom",
  //   path: "/dicom",
  //   exact: false,
  //   component: DicomManage,
  //   routes: [
  //     {
  //       name: "dicom upload",
  //       path: "/dicom/upload",
  //       exact: true,
  //       component: DicomUploader,
  //     },
  //     {
  //       name: "dicom viewer",
  //       path: "/dicom/viewer",
  //       exact: true,
  //       component: DicomViewer,
  //     },
  //   ],
  //   permission: ["login"],
  // },
];

export default routes;
