import React from 'react';
import { HashRouter, Link, withRouter, Switch, Redirect } from 'react-router-dom';
import routes from './routes';
// import { routerActions } from 'connected-react-router';
import { Layout, Menu, Icon } from 'antd';
import MyHeader from './components/Header/Header';
import MyFooter from './components/Footer/Footer';
import RouteWithSubRoutes from './components/RouteWithSubRoutes';
import './app.less';

const { Header, Footer, Sider, Content } = Layout;
class App extends React.Component {
    render() {
        return (
            <Layout className="mediclouds-layout">
                <MyHeader />
                <Layout>
                    <Content id="content-container" className="content-container">
                        <HashRouter>
                            <ul>
                                {routes.map((item, index) => {
                                    return <li key={index}>
                                        <Link to={item.path}>{item.name}</Link>
                                    </li>
                                })}
                            </ul>
                            <Switch>
                                {routes.map((item, index) => {
                                    return <RouteWithSubRoutes key={index} {...item} />
                                })}

                                {/* 错误URL处理 */}
                                {/*
                                <Route render={()=>{
                                    return(<div>Error page</div>);
                                }} />
                                */}
                                <Redirect to={{
                                    pathname: '/',
                                    search: '?lx=404',
                                }} />
                            </Switch>
                        </HashRouter>
                    </Content>
                </Layout>
                <MyFooter></MyFooter>
            </Layout>
        );
    }
}

export default withRouter(App as any);
