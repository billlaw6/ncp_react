import React, { Component } from "react";
import { Router, Link, withRouter, Switch, Redirect } from "react-router-dom";
import routes from "./routes";
// import { routerActions } from 'connected-react-router';
import { Layout } from "antd";
import MyHeader from "./components/Header/Header";
import MyFooter from "./components/Footer/Footer";
import RouteWithSubRoutes from "./components/RouteWithSubRoutes";
import { history } from "./store/configureStore";

import DefaultLayout from "./Layout/Default";
import "./App.less";

const { Header, Footer, Sider, Content } = Layout;

// class App extends Component {
//   render() {
//     return <DefaultLayout>Hello world</DefaultLayout>;
//   }
// }
class App extends React.Component {
    render() {
        return (
            <DefaultLayout>
                <Content id="content-container">
                    <div className="content-container">
                        {/* 原本用官方推荐的BrowserRouter，结果只变url不刷新页面
                    https://github.com/brickspert/blog/issues/3 */}
                        <Router history={history}>
                            <ul className="content-router-link">
                                {routes.map((item, index) => {
                                    return (
                                        <li key={index}>
                                            <Link to={item.path}>{item.name}</Link>
                                        </li>
                                    );
                                })}
                            </ul>
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
                    </div>
                </Content>
            </DefaultLayout>
        );
    }
}

export default withRouter(App as any);
