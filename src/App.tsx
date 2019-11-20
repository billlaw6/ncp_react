import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Routes from './routes';
// import { routerActions } from 'connected-react-router';
import { Layout, Menu, Icon } from 'antd';
import MyHeader from './pages/home/components/MyHeader';

const { Header, Footer, Sider, Content } = Layout;
// const { SubMenu } = Menu;

class App extends React.Component {
    constructor(props: any) {
        super(props);
    }
    render() {
        return (
            <>
                <Layout className="mediclouds-layout">
                    <MyHeader />
                    <Content>
                        <Router>
                            <Switch>
                                {Routes.map((item, index) => {
                                    return (
                                        <Route
                                            key={item.name}
                                            path={item.path}
                                            exact
                                            component={item.component}
                                        />
                                    );
                                })}
                            </Switch>
                        </Router>
                    </Content>
                    <Footer>Footer</Footer>
                </Layout>
            </>
        );
    }
}

export default App;
