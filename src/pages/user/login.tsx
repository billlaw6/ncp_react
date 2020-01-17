import React, { ChangeEventHandler } from "react";
import { connect } from "react-redux";
import LoginForm from "./components/LoginForm";
import {
  setWeChatCodeAction,
  setLoginFormAction,
  submitLoginFormAction,
  setCurrentUserAction,
} from "../../store/actions/user";
import { LoginFormI, StoreStateI } from "../../constants/interface";
import WeChatLogin from "./components/WeChatLogin";
import "./login.less";
import ContentLogo from "./components/ContentLogo";
import qs from "qs";
import { stringify } from "querystring";
import { message } from "antd";

const mapStateToProps = (state: StoreStateI) => {
  // console.log(state);
  return {
    router: state.router,
    loginForm: state.loginForm,
    currentUser: state.currentUser,
  };
};
type StatePropsI = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = {
  setWeChatCodeAction,
  setLoginFormAction,
  submitLoginFormAction,
  setCurrentUserAction,
};
type DispatchPropsI = typeof mapDispatchToProps;
type PropsI = StatePropsI & DispatchPropsI;

type StateI = {
  // LoginForm用的组件内State
  fields: {
    username: {
      value: string;
    };
    password: {
      value: string;
    };
    remember: {
      value: boolean;
    };
    messages: {
      value: Array<string>;
    };
  };
  // 微信扫码用的State
  appid: string;
  redirectUri: string;
};

class Login extends React.Component<PropsI, StateI> {
  constructor(props: PropsI) {
    super(props);
    this.state = {
      // appid: "wx0aee911ac049680c",
      appid: "wxed42db352deaa115",
      redirectUri: "https://mi.mediclouds.cn/oauth/",
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
      },
    };
  }

  // componentDidMount() {
  //   const query = this.props.router.location.search.substr(1);
  //   // console.log(query);
  //   const obj = qs.parse(query);
  //   // console.log(obj);
  //   if (obj.code) {
  //     this.props.setWeChatCodeAction(obj);
  //     console.log("wechat oauth2 login");
  //   } else {
  //     console.log("no weChat code");
  //   }
  // }

  handleFormChange = (changedValues: LoginFormI) => {};

  handleFormSubmit = (submitedFormData: LoginFormI) => {
    this.props.submitLoginFormAction(submitedFormData);
    // console.log(submitedFormData);
  };

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
          href="https://mi.mediclouds.cn/static/css/qrcode.css"
        />
      </div>
    );
  }
}

// export default Login;
export default connect(mapStateToProps, mapDispatchToProps)(Login);
