import React from 'react';
import './WeChatLogin.less';
import scan_demo from '../../../assets/images/scan_demo.jpeg';

declare interface IProps {
    appid: string,
    redirectUri: string,
    style?: string,
    href?: string,
}

const WeChatLogin = function (props: IProps) {
    const parsedRedirectUri = encodeURI(props.redirectUri);
    const style = props.style || 'black';
    const href = props.href;
    const qrcodeURL = `https://open.weixin.qq.com/connect/qrconnect?` +
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
        `href=` + href + '&' +
        `response_type=code&` +
        `#wechat_redirect`;
    // console.log(qrcodeURL);
    return (
        <div className="wechat-login">
            <h2>微信登录</h2>
            <div className="wechat-qrcode">
                <iframe 
                    title="WeChatLogin"
                    src={qrcodeURL}
                    frameBorder={0} 
                    scrolling="no" 
                    width="200px"
                    height="300px"
                />
            </div>
            <div className="wechat-demo">
                <img src={scan_demo} alt="demo-pic" style={{ width: 100, height: 100}}></img>
            </div>
            <h3>打开微信，扫一扫登录</h3>
        </div>
    )
}

export default WeChatLogin;