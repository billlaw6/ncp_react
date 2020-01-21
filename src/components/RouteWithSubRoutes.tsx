import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { StoreStateI, RouteI } from "_constants/interface";
import { history } from "../store/configureStore";

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

class RouteWithSubRoutes extends React.Component<any, any> {
  // 二级路由路径需要非exact匹配？从路由配置里取值更灵活
  componentWillMount () {
    const persistRoot = JSON.parse(localStorage.getItem("persist:root")!);
    if (
      persistRoot.currentUser &&
      JSON.parse(persistRoot.currentUser).token &&
      JSON.parse(persistRoot.currentUser).token.length > 2
    ) {
      console.log(persistRoot.currentUser);
    } else {
      history.replace("/login");
    }
  }
  render() {
    const { path, exact, routes } = this.props;
    return (
      <Route
        path={path}
        exact={exact}
        render={props => <this.props.component {...props} routes={routes} />}
      />
    );
  }
}

export default RouteWithSubRoutes;
