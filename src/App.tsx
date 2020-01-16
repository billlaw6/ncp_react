import React, { Component, ReactElement } from "react";
import { BrowserRouter as Router, Switch, Redirect, Route } from "react-router-dom";
import routes from "./routes";

import DefaultLayout from "_layout/Default";
import RouteWithSubRoutes from "_components/RouteWithSubRoutes";

/* pages */
import Upload from "_pages/upload/Upload";
import Home from "_pages/home";

import "./App.less";

class App extends Component {
  render(): ReactElement {
    return (
      <DefaultLayout>
        <Router>
          <Switch>
            <Route path="/upload" component={Upload}></Route>
            <Route path="/" component={Home} exact></Route>
            {/* {routes.map((item, index) => {
              return <RouteWithSubRoutes key={index} {...item} />;
            })} */}

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
