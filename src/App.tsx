import React, { Component, ReactElement } from "react";
import { BrowserRouter as Router, Switch, Redirect, Route } from "react-router-dom";
import routes from "./routes";

import DefaultLayout from "_layout/Default/Default";
import RouteWithSubRoutes from "_components/RouteWithSubRoutes";

/* pages */
import Upload from "_pages/upload/Upload";
import Home from "_pages/home";
import Player from "_pages/player/Player";
import Error from "_pages/error/Error";
import Login from "_pages/login/Login";

import "./App.less";

class App extends Component {
  render(): ReactElement {
    return (
      <DefaultLayout>
        <Router>
          <Switch>
            <Route path="/upload" component={Upload}></Route>
            <Route path="/player" component={Player}></Route>
            <Route path="/login" component={Login}></Route>
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
            <Route path="/404" component={Error}></Route>
            <Redirect
              to={{
                pathname: "/404",
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
