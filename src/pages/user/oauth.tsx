import React from "react";
import { Link } from "react-router-dom";
import qs from "qs";
import { connect } from "react-redux";
import { StoreStateI } from "_constants/interface";
import { setUserAction } from "_actions/user";
import { weChatLoginUser } from "_services/user";
import { replace } from "react-router-redux";

class Oauth extends React.Component<any, any> {
  componentDidMount() {
    const query = this.props.router.location.search.substr(1);
    console.log(query);
    const obj = qs.parse(query);
    console.log(obj);
    if (obj.code) {
      // const res = await weChatLoginUser(obj.code);
      // setUserAction(res);
      weChatLoginUser(obj.code)
        .then(res => {
          console.log(res);
          // setUserAction(res);
        })
        .catch(error => {
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
  setUserAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(Oauth);
