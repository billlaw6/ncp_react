import React, { Component, ReactElement } from "react";
import { Route, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { StoreStateI, RouteI } from "_constants/interface";
import { history } from "../store/configureStore";
import { RoutesI } from "routes";
import DefaultLayout from "_layout/Default/Default";

// declare interface PropsI {
//   // 父项传进来的本模块的子路由
//   // key: string;
//   // route: RouteI;
//   path: string;
//   name: string;
//   exact: boolean;
//   component: typeof RouteWithSubRoutes;
//   routes?: RouteI[];
//   permission?: string[];
// }
class RouteWithSubRoutes extends Component<RoutesI> {
  // 二级路由路径需要非exact匹配？从路由配置里取值更灵活
  componentDidMount(): void {
    const persistRoot = JSON.parse(localStorage.getItem("persist:root")!);
    if (
      persistRoot &&
      persistRoot.currentUser &&
      JSON.parse(persistRoot.currentUser).token &&
      JSON.parse(persistRoot.currentUser).token.length > 2
    ) {
      // console.log(persistRoot.currentUser);
    } else {
      history.replace("/login");
    }
  }
  render(): ReactElement {
    const { path, exact = false, routes = [], component, layout = DefaultLayout } = this.props;
    const Cmp = component;
    const Layout = layout;

    return (
      <Route
        path={path}
        exact={exact}
        render={(props): ReactElement => {
          return (
            <Layout>
              <Cmp {...props}></Cmp>
            </Layout>
          );
        }}
      />
    );
  }
}

export default RouteWithSubRoutes;
