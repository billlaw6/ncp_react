import React, { ChangeEventHandler } from 'react';
import { connect } from 'react-redux';
import LoginForm from './components/LoginForm';
import { setWeChatCodeAction, setLoginFormAction, submitLoginFormAction, setCurrentUserAction } from '../../store/actions/user';
import { ILoginForm, IStoreState } from '../../constants/interface';
import WeChatLogin from './components/WeChatLogin';
import './login.less';
import ContentLogo from './components/ContentLogo';
import qs from 'qs';
import { stringify } from 'querystring';
import { message } from 'antd';

const mapStateToProps = (state: IStoreState) => {
    // console.log(state);
    return {
        router: state.router,
        loginForm: state.loginForm,
        currentUser: state.currentUser,
    };
};
type IStateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = {
    setWeChatCodeAction,
    setLoginFormAction,
    submitLoginFormAction,
    setCurrentUserAction,
};
type IDispatchProps = typeof mapDispatchToProps;
type IProps = IStateProps & IDispatchProps;

type IState = {
    // LoginForm用的组件内State
    fields: {
        username: {
            value: string,
        },
        password: {
            value: string,
        },
        remember: {
            value: boolean,
        },
        messages: {
            value: Array<string>,
        },
    }
    // 微信扫码用的State
    appid: string,
    redirectUri: string,
}

class Login extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            appid: 'wx0aee911ac049680c',
            redirectUri: 'https://mi.mediclouds.cn/login/',
            // 使用Reducer里设置的初始值
            fields: {
                username: {
                    value: props.loginForm.username,
                },
                password: {
                    value: props.loginForm.password,
                },
                remember: {
                    value: props.loginForm.remember,
                },
                messages: {
                    value: props.loginForm.messages,
                },
            }
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
            this.props.setWeChatCodeAction(obj.code)
            console.log('wechat oauth2 login');
        } else {
            console.log('no code');
        }
    }

    handleFormChange = (changedValues: ILoginForm) => {
        // 下面两个操作都加和都不加效果一样，表单Input刷新后也没从localstorage取值展示
        // setState非常重要，不设置页面值不能更新，因为后面form item赋值走的state，不是props，以后可以去掉state试试。
        // Object.keys(changedValues).forEach((key) => {
        //     if (key === 'username') {
        //         this.setState({
        //             fields: {...this.state.fields, ...{ username: { value: changedValues[key]}}},
        //         });
        //         console.log('set username');
        //     } else if (key === 'password') {
        //         this.setState({
        //             fields: {...this.state.fields, ...{ password: { value: changedValues[key]}}},
        //         });
        //         console.log('set username');
        //     } else if (key === 'remember') {
        //         this.setState({
        //             fields: {...this.state.fields, ...{ remember: { value: changedValues[key]}}},
        //         });
        //         console.log('set username');
        //     } else {
        //         console.log('no matched key');
        //     }
        // })
        // this.props.setLoginFormAction(changedValues);
    }

    handleFormSubmit = (submitedFormData: ILoginForm) => {
        this.props.submitLoginFormAction(submitedFormData);
        console.log(submitedFormData);
    }

    render() {
        const { fields } = this.state;
        return (
            <div className="login-wrapper">
                <ContentLogo />
                <LoginForm
                    fields={fields}
                    onChange={this.handleFormChange}
                    onSubmit={this.handleFormSubmit}
                />
                <WeChatLogin
                    appid={this.state.appid}
                    redirectUri={this.state.redirectUri}
                    href="https://mediclouds-web-style.oss-cn-beijing.aliyuncs.com/qrcode.css"
                />
            </div>
        );
    }
}

// export default Login;
export default connect(mapStateToProps, mapDispatchToProps)(Login);
