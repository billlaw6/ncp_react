import React, { ChangeEventHandler } from 'react';
import { connect } from 'react-redux';
import LoginForm from './login/LoginForm';
import { userLoginAction, userLogoutAction } from '../../store/actions/user';
import { ILoginState, IStoreState } from '../../constants/interface';
import WeChatLogin from './components/WeChatLogin';
import './login.less';
import {
    tokenFetchRequstedAction,
    tokenFetchSucceededAction,
    tokenFetchFailedAction,
} from '../../store/actions/token';
import ContentLogo from './components/ContentLogo';
import { userWeChatLogin } from '../../services/user';
import qs from 'qs';
import { history } from '../../store/configureStore';

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
// class Login extends React.Component<IProps, IState> {
class Login extends React.Component<any, any> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            appid: 'wx0aee911ac049680c',
            redirectUri: 'https://www.mediclouds.cn/login/',
            fields: props.token,
        }
    }
    
    componentDidMount() {
        // console.log('mounted')
        console.log(this.props)
        // console.log(this.props.router.location)
        let query = this.props.router.location.search.substr(1)
        let obj = qs.parse(query)
        console.log(obj);
        if (obj.code) {
            userWeChatLogin(obj).then((res) => {
                console.log(res);
                let { data } = res
                let token = data.token;
                let user_info = data.user_info;
                console.log(token);
                console.log(user_info);
                // history.push('/canvas')
            }, (err) => {
                console.log(err);
                // history.push('/error')
            })
        }
    }

    // handleFormChange = (changedValues: ILoginState) => {
    //     // setState非常重要，不设置页面值不能更新，因为后面form item赋值走的state，不是props，以后可以去掉state试试。
    //     this.setState(({ fields }) => ({
    //         fields: { ...fields, ...changedValues},
    //     }));
    //     // console.log(changedValues);
    //     this.props.tokenFetchSucceededAction(changedValues);
    // }

    handleFormSubmit = (submitedFormData: ILoginState) => {
        // console.log(submitedFormData);
        this.props.tokenFetchRequstedAction(submitedFormData);
    }

    render() {
        const { fields } = this.state;
        return (
            <div className="login-wrapper">
                <ContentLogo />
                {/* <LoginForm
                    fields={fields}
                    onChange={this.handleFormChange}
                    onSubmit={this.handleFormSubmit}
                /> */}
                <WeChatLogin
                    appid={this.state.appid}
                    redirectUri={this.state.redirectUri}
                    href="https://mediclouds-web-style.oss-cn-beijing.aliyuncs.com/qrcode.css"
                />
            </div>
        );
    }
}

export default Login;
// export default connect(mapStateToProps, mapDispatchToProps)(Login);
