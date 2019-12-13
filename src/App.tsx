import React from 'react';
import { BrowserRouter, HashRouter, Link, Route, Switch, Redirect } from 'react-router-dom';
import routes from './routes';
// import { routerActions } from 'connected-react-router';
import { Layout, Menu, Icon } from 'antd';
import MyHeader from './components/Header';
import MyFooter from './components/Footer';
import RouteWithSubRoutes from './components/RouteWithSubRoutes';
import './app.less';

const { Header, Footer, Sider, Content } = Layout;


class App extends React.Component {
    constructor(props: any) {
        super(props);
    }
    render() {
        return (
            <Layout className="mediclouds-layout">
                <MyHeader />
                <Layout>
                    <Content id="content-container" className="content-container">
                        <BrowserRouter>
                            <ul>
                                <li>
                                    <Link to="/login">Login</Link>
                                </li>
                                <li>
                                    <Link to="/dicom">dicom</Link>
                                </li>
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
                        </BrowserRouter>
                    </Content>
                </Layout>
                <MyFooter></MyFooter>
            </Layout>
        );
    }
}

export default App;
