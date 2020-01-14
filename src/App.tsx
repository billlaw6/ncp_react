import React, { Component, ReactElement } from "react";
import { BrowserRouter as Router, Link, withRouter, Switch, Redirect } from "react-router-dom";
import routes from "./routes";
// import { routerActions } from 'connected-react-router';
import { Layout, Menu, Icon } from "antd";
import MyHeader from "./components/Header/Header";
import MyFooter from "./components/Footer/Footer";
import RouteWithSubRoutes from "./components/RouteWithSubRoutes";

import DefaultLayout from "./Layout/Default";
import "./App.less";

const { Header, Footer, Sider, Content } = Layout;

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
