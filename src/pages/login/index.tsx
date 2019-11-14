import React, { ChangeEventHandler } from 'react';
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import QRCodeLogin from './components/QRCodeLogin';
import { userLoginAction, userLogoutAction } from '../../actions/user';
import { IStoreState } from '../../constants/store';
import WxLogin from './components/WxLogin';
import './index.css';

const mapStateToProps = (state: IStoreState) => {
    // console.log(state);
    return {
        router: state.router,
        user: state.user,
    };
};
type IStateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = {
    userLoginAction,
    userLogoutAction,
};
type IDispatchProps = typeof mapDispatchToProps;
type IProps = IStateProps & IDispatchProps;

type IState = {
    appid: string;
    redirectUri: string;
}
class Login extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        console.log(props);
        console.log(this.state);
        this.state = {
            appid: 'wxbdc5610cc59c1631',
            redirectUri: 'https://passport.yhd.com/wechat/callback.do',
        }
    }

    render() {
        return (
            <div className="login-wrapper">
                <LoginForm />
                <WxLogin appid={this.state.appid} redirectUri={this.state.redirectUri} />
            </div>
        );
    }
}

// export default Login;
export default connect(mapStateToProps, mapDispatchToProps)(Login);