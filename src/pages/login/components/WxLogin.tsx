import React from 'react';
import './wx-login.css';

const WxLogin = function (props: {appid: string; redirectUri: string}) {
    const parsedRedirectUri = encodeURI(props.redirectUri);
    const qrcodeURL = `https://open.weixin.qq.com/connect/qrconnect?` +
        `appid=${props.appid}&` +
        `scope=snsapi_login&` +
        `redirect_uri=${parsedRedirectUri}&` +
        `state=STATUS&` +
        `login_type=jssdk&` +
        `self_redirect=false&` +
        `styletype=` +
        `sizetype=L` +
        `bgcolor=black` +
        `rst=` +
        `style=` +
        `href=` +
        `response_type=code&` +
        `#wechat_redirect`;
    console.log(qrcodeURL);
    return (
        <div className="weixin-login">
            <iframe 
                src={qrcodeURL}
                frameBorder={0} 
                allowTransparency={true} 
                scrolling="no" 
                width="300px"
                height="400px"
            />
        </div>
    )
}

export default WxLogin;