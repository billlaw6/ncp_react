import React from 'react';
import { BrowserRouter, HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import routes from './routes';
// import { routerActions } from 'connected-react-router';
import { Layout, Menu, Icon } from 'antd';
import MyHeader from './components/Header';
import MyFooter from './components/Footer';
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
                            <Switch>
                                {routes.map((item, index) => {
                                    return (
                                        <Route
                                            key={item.name}
                                            path={item.path}
                                            exact
                                            render={
                                                () => {
                                                    if (1) {
                                                        return <item.component />;
                                                    }
                                                    return(<div>权限校验失败</div>);
                                                }
                                            }
                                        />
                                    );
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
