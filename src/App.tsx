import React, { Component, ReactElement } from "react";
import { Router, Link, withRouter, Switch, Redirect } from "react-router-dom";
import routes from "./routes";
import RouteWithSubRoutes from "./components/RouteWithSubRoutes";
import { history } from "./store/configureStore";

import DefaultLayout from "_layout/Default";

import "./App.less";

class App extends Component {
  render(): ReactElement {
    return (
      <DefaultLayout>
        <Router history={history}>
          <Switch>
            {routes.map(item => {
              return <RouteWithSubRoutes key={item.name} {...item} />;
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
