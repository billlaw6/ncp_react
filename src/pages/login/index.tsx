import React, { ChangeEventHandler } from 'react';
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import QRCodeLogin from './components/QRCodeLogin';
import { userLoginAction, userLogoutAction } from '../../actions/user';
import { IStoreState } from '../../constants/store';

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
            appid: '',
            redirectUri: '',
        }
    }

    render() {
        return (
            <>
                <LoginForm />
                <QRCodeLogin appid={this.state.appid} redirectUri={this.state.redirectUri} />
            </>
        );
    }
}

// export default Login;
export default connect(mapStateToProps, mapDispatchToProps)(Login);