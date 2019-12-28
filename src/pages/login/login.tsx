import React, { ChangeEventHandler } from 'react';
import { connect } from 'react-redux';
import LoginForm from './components/LoginForm';
import { setWeChatCodeAction, setLoginFormAction, submitLoginFormAction, setCurrentUserAction } from '../../store/actions/user';
import { ILoginForm, IStoreState } from '../../constants/interface';
import WeChatLogin from './components/WeChatLogin';
import './login.less';
import ContentLogo from './components/ContentLogo';
import qs from 'qs';

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
        username: string,
        password: string,
        remember: boolean,
        messages: Array<string>,
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
            redirectUri: 'https://www.mediclouds.cn/login/',
            // 使用Reducer里设置的初始值
            fields: props.loginForm,
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
            console.log('loging');
        } else {
            console.log('no code');
        }
    }

    handleFormChange = (changedValues: ILoginForm) => {
        // setState非常重要，不设置页面值不能更新，因为后面form item赋值走的state，不是props，以后可以去掉state试试。
        this.setState(({ fields }) => ({
            fields: { ...fields, ...changedValues},
        }));
        // console.log(changedValues);
        // this.props.setLoginFormAction(changedValues);
    }

    handleFormSubmit = (submitedFormData: ILoginForm) => {
        this.props.submitLoginFormAction(submitedFormData);
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
