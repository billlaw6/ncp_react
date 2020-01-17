import React from "react";
import { Link } from "react-router-dom";
import qs from "qs";
import { connect } from "react-redux";
import { StoreStateI } from "../../constants/interface";
import {
  setWeChatCodeAction,
  setLoginFormAction,
  submitLoginFormAction,
  setCurrentUserAction,
} from "../../store/actions/user";

class Oauth extends React.Component<any, any> {
  // static getDerivedStateFromProps(nextProps: any, preState: any) {
  //   console.log(nextProps);
  //   console.log(preState);
  //   const query = nextProps.router.location.search.substr(1);
  //   console.log(query);
  //   const obj = qs.parse(query);
  //   console.log(obj);
  //   if (obj.code) {
  //     nextProps.setWeChatCodeAction(obj);
  //     console.log("wechat oauth2 login");
  //   } else {
  //     console.log("no code");
  //   }
  //   return null;
  // }

  componentDidMount() {
    const query = this.props.router.location.search.substr(1);
    console.log(query);
    const obj = qs.parse(query);
    console.log(obj);
    if (obj.code) {
      this.props.setWeChatCodeAction(obj);
      console.log("wechat oauth2 login");
    } else {
      console.log("no code");
    }
    return null;
  }

  render() {
    return (
      <div className="login-redirect">
        页面即将跳转，如长时间未跳转，请手动点击<Link to="/login">登录</Link>
      </div>
    );
  }
}

const mapStateToProps = (state: StoreStateI) => {
  // console.log(state);
  return {
    router: state.router,
  };
};
const mapDispatchToProps = {
  setWeChatCodeAction,
  setLoginFormAction,
  submitLoginFormAction,
  setCurrentUserAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(Oauth);
