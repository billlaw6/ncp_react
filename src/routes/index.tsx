import { ComponentType } from "react";

import Home from "_pages/home/index";
import Register from "_pages/register/Register";
import Login from "_pages/login_action/Login";
import Profile from "_pages/profile/Profile";
// import TempReport from "_pages/temp_report/TempReport";
// import CadreReport from "_pages/cadre_report/CadreReport";
import DailyReport from "_pages/daily_report/DailyReport";

import DefaultLayout from "_layout/Default/Default";
import FullscreenLayout from "_layout/FullscreenLayout/FullscreenLayout";

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
    name: "register",
    path: "/register",
    component: Register,
  },
  {
    name: "login",
    path: "/login",
    component: Login,
    // layout: FullscreenLayout,
  },
  {
    name: "profile",
    path: "/profile",
    component: Profile,
    permission: ["login"],
  },
  {
    name: "dailyReport",
    path: "/daily-report",
    component: DailyReport,
    permission: ["login"],
  },
  // {
  //   name: "tempReport",
  //   path: "/temp-report",
  //   component: TempReport,
  //   permission: ["login"],
  // },
  // {
  //   name: "cadreReport",
  //   path: "/cadre-report",
  //   component: CadreReport,
  //   permission: ["login"],
  // },
];

export default routes;
