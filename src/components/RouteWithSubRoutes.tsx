import React from "react";
import { Route } from "react-router-dom";
import { RouteI } from "_constants/interface";

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
  // function RouteWithSubRoutes(route: any) {
  render() {
    const { path, exact, routes } = this.props;
    return (
      <Route path={path} exact={exact} render={props => <this.props.component {...props} routes={routes} />} />
    );
  }
}

export default RouteWithSubRoutes;
