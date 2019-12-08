import React, { ChangeEventHandler } from 'react';
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import LoginForm from './login/LoginForm';
import { userLoginAction, userLogoutAction } from '../../store/actions/user';
import { ILoginState, IStoreState } from '../../constants/store';
import WxLogin from './login/WxLogin';
import './index.less';
import {
    tokenFetchRequstedAction,
    tokenFetchSucceededAction,
    tokenFetchFailedAction,
} from '../../store/actions/token';
import Dialog from './login/Dialog';
import DialogCom from './login/DialogCom';
import Clock from './login/Clock';

const mapStateToProps = (state: IStoreState) => {
    // console.log(state);
    return {
        router: state.router,
        user: state.user,
        token: state.token,
    };
};
type IStateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = {
    userLoginAction,
    userLogoutAction,
    tokenFetchRequstedAction,
    tokenFetchSucceededAction,
    tokenFetchFailedAction,
};
type IDispatchProps = typeof mapDispatchToProps;
type IProps = IStateProps & IDispatchProps;

type IState = {
    appid: string,
    redirectUri: string,
    fields: {
        username: string,
        password: string,
        token: string,
        messages: Array<string>,
    }
}
class Login extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            appid: 'wx0aee911ac049680c',
            redirectUri: 'https://mediclouds.cn/wechat/login',
            fields: props.token,
        }
    }

    handleFormChange = (changedValues: ILoginState) => {
        // setState非常重要，不设置页面值不能更新，因为后面form item赋值走的state，不是props，以后可以去掉state试试。
        this.setState(({ fields }) => ({
            fields: { ...fields, ...changedValues},
        }));
        // console.log(changedValues);
        this.props.tokenFetchSucceededAction(changedValues);
    }

    handleFormSubmit = (submitedFormData: ILoginState) => {
        // console.log(submitedFormData);
        this.props.tokenFetchRequstedAction(submitedFormData);
    }

    render() {
        const { fields } = this.state;
        return (
            <div className="login-wrapper">
                <LoginForm
                    fields={fields}
                    onChange={this.handleFormChange}
                    onSubmit={this.handleFormSubmit}
                />
                <WxLogin appid={this.state.appid} redirectUri={this.state.redirectUri} />
                <Dialog type={1} content='我是内容' />
                <DialogCom type={1} content='我是内容' />
                <Clock />
            </div>
        );
    }
}

// export default Login;
export default connect(mapStateToProps, mapDispatchToProps)(Login);