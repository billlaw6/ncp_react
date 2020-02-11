import React, { FunctionComponent, useEffect, useState } from "react";
import { Carousel } from "antd";
import { connect } from "react-redux";

import { setUserAction } from "_actions/user";
import { StoreStateI } from "_constants/interface";

// import img1 from "_images/login-spinner-1.png";
// import img2 from "_images/login-spinner-2.png";
// import img3 from "_images/login-spinner-3.png";
import wechatScan from "_images/wechat-scan.png";

import "./Login.less";
import { MapStateToPropsI, MapDispatchToPropsI } from "./type";

const Login: FunctionComponent<MapStateToPropsI & MapDispatchToPropsI> = props => {
  const [hiddenScan, setHiddenScan] = useState(false);
  useEffect(() => {
    console.log("login mounted");
  }, []);

  return (
    <div className="login">
      <div className="login-content">
        <span className="login-content-title">登录</span>
        <div className={`login-content-imgs ${hiddenScan ? "hidden" : ""}`}>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: StoreStateI): MapStateToPropsI => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps: MapDispatchToPropsI = {
  setUserAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
