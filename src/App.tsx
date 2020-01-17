import React, { Component, ReactElement } from "react";
import { Router, Link, withRouter, Switch, Redirect } from "react-router-dom";
import routes from "./routes";
// import { routerActions } from 'connected-react-router';
import { Layout } from "antd";
import MyHeader from "./components/Header/Header";
import MyFooter from "./components/Footer/Footer";
import RouteWithSubRoutes from "./components/RouteWithSubRoutes";
import { history } from "./store/configureStore";

import DefaultLayout from "_layout/Default";
import RouteWithSubRoutes from "_components/RouteWithSubRoutes";

import "./App.less";

class App extends Component {
  render(): ReactElement {
    return (
      <DefaultLayout>
        <Router history={history}>
          <Switch>
            {routes.map((item, index) => {
              return <RouteWithSubRoutes key={index} {...item} />;
            })}

            {/* 错误URL处理 */}
            {/*
            <Route render={()=>{
                return(<div>Error page</div>);
            }} />
            */}
            <Redirect
              to={{
                pathname: "/",
                search: "?lx=404",
              }}
            />
          </Switch>
        </Router>
      </DefaultLayout>
    );
  }
}

export default App;
