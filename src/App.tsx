import React, { Component, ReactElement } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import routes from "./routes";

import DefaultLayout from "_layout/Default";
import RouteWithSubRoutes from "_components/RouteWithSubRoutes";

import "./App.less";

class App extends Component {
  render(): ReactElement {
    return (
      <DefaultLayout>
        <Router>
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
