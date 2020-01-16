import React from "react";
import "./WeChatLogin.less";
import scanDemo from "../../../assets/images/scan_demo.jpeg";

declare interface PropsI {
  appid: string;
  redirectUri: string;
  style?: string;
  href?: string;
}

const WeChatLogin = function (props: PropsI) {
  const parsedRedirectUri = encodeURI(props.redirectUri);
  const style = props.style || "black";
  const href = props.href;
  const qrcodeURL =
    `https://open.weixin.qq.com/connect/qrconnect?` +
    `appid=${props.appid}&` +
    `scope=snsapi_login&` +
    `redirect_uri=${parsedRedirectUri}&` +
    `state=STATUS&` +
    `login_type=jssdk&` +
    `self_redirect=false&` +
    `styletype=&` +
    `sizetype=L&` +
    `bgcolor=black&` +
    `rst=&` +
    `style=&` +
    `href=` +
    href +
    "&" +
    `response_type=code&` +
    `#wechat_redirect`;
  // console.log(qrcodeURL);
  return (
    <div className="wechat-login">
      <h2>微信登录</h2>
      <div className="wechat-wrapper">
        <div className="wechat-wrapper-qrcode">
          <iframe
            title="WeChatLogin"
            src={qrcodeURL}
            frameBorder={0}
            scrolling="no"
            width="200px"
            height="300px"
          />
        </div>
        <div className="wechat-wrapper-demo">
          <img src={scanDemo} alt="demo-pic" style={{ width: 100, height: 100 }}></img>
        </div>
      </div>
      <h3>打开微信，扫一扫登录</h3>
    </div>
  );
};

export default WeChatLogin;
