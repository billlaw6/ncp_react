import React, { ReactElement } from "react";
import { connect } from "react-redux";
import { setCurrentUserAction } from "../../store/actions/user";
import { StoreStateI } from "../../constants/interface";
import "./logout.less";
import ContentLogo from "./components/ContentLogo";
import { stringify } from "querystring";
import { message } from "antd";

const mapStateToProps = (state: StoreStateI) => {
  return {
    router: state.router,
    currentUser: state.currentUser,
  };
};
type StatePropsI = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = {
  setCurrentUserAction,
};
type DispatchPropsI = typeof mapDispatchToProps;
type PropsI = StatePropsI & DispatchPropsI;

class Login extends React.Component<PropsI, any> {
  componentDidMount(): void {
    this.props.setCurrentUserAction({ ...this.props.currentUser, token: "" });
  }

  render(): ReactElement {
    return <div className="logout-wrapper">您已经成功退出登录！</div>;
  }
}

// export default Login;
export default connect(mapStateToProps, mapDispatchToProps)(Login);
