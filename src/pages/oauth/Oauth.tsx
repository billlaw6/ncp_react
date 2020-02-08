import React from "react";
import { Link } from "react-router-dom";
import qs from "qs";
import { connect } from "react-redux";
import { StoreStateI } from "_constants/interface";
import { setTokenAction, setUserAction } from "_actions/user";
import { weChatLoginUser } from "../../services/user";
import { history } from "../../store/configureStore";

class Oauth extends React.Component<any, any> {
  componentDidMount() {
    const { setToken, setUser } = this.props;
    const query = this.props.router.location.search.substr(1);
    // console.log(query);
    const obj = qs.parse(query);
    // console.log(obj);
    if (obj.code) {
      // const res = await weChatLoginUser(obj.code);
      // setUserAction(res);
      weChatLoginUser(obj)
        .then(res => {
          // console.log(res.data.user_info);
          setToken(res.data.token);
          setUser(res.data.user_info);
          history.replace("/");
        })
        .catch(error => {
          setToken("");
          setUser({});
          console.log(error);
        });
    } else {
      console.log("no code");
      // history.;
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
  return {
    router: state.router,
  };
};
const mapDispatchToProps = {
  setToken: setTokenAction,
  setUser: setUserAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(Oauth);
