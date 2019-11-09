import React, { ChangeEventHandler } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { useHistory, useLocation } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import { Layout } from 'antd';
import { userLoginAction, userLogoutAction } from '../../actions/user';
import { IStoreState } from '../../constants/store.d';

const { Header, Footer, Sider, Content } = Layout;

const mapStateToProps = (state: IStoreState) => {
    return {
        user: state.user,
    };
};
type IStateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = {
    userLoginAction,
    userLogoutAction,
};
type IDispatchProps = typeof mapDispatchToProps;

type IProps = RouteComponentProps<any> & IStateProps & IDispatchProps;

class Login extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }

    onLoginFormSubmit = () => {
        console.log('login submit');
        console.log(this);
        this.props.userLoginAction({
            username: 'this.state.username',
            password: 'this.state.password',
        });
    };

    render() {
        return (
            <Layout>
                <Header>Header</Header>
                <Content>
                    <LoginForm/>
                </Content>
                <Footer>Footer</Footer>
            </Layout>
        );
    }
}

export default Login;
