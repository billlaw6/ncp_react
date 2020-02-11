import React, { Component, ReactElement } from "react";
import { Route, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { StoreStateI, RouteI } from "_constants/interface";
import { history } from "../store/configureStore";
import { RoutesI } from "routes";
import DefaultLayout from "_layout/Default/Default";

class RouteWithSubRoutes extends Component<RoutesI & MapStateToPropsI> {
  // 二级路由路径需要非exact匹配？从路由配置里取值更灵活
  componentDidMount(): void {
    const { permission = [], token } = this.props;
    if (permission.length > 0) {
      if (token.length > 0) {
        console.log(token);
      } else {
        // history.push({ pathname: "/login" });
      }
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

// export default RouteWithSubRoutes;
interface MapStateToPropsI {
  token: string;
}
const mapStateToProps = (state: StoreStateI): MapStateToPropsI => {
  return {
    token: state.token,
  };
};

export default connect(mapStateToProps)(RouteWithSubRoutes);
