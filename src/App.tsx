import React, { Component, ReactElement } from "react";
import { BrowserRouter as Router, Switch, Redirect, Route } from "react-router-dom";
import routes from "./routes";

import DefaultLayout from "_layout/Default/Default";
import RouteWithSubRoutes from "_components/RouteWithSubRoutes";

/* pages */
import Error from "_pages/error/Error";

import "./App.less";

class App extends Component {
  render(): ReactElement {
    return (
      <Router>
        <Switch>
          {routes.map((item, index) => {
            return <RouteWithSubRoutes key={index} {...item} />;
          })}
          <Route
            render={(): ReactElement => (
              <DefaultLayout>
                <Error></Error>
              </DefaultLayout>
            )}
          ></Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
