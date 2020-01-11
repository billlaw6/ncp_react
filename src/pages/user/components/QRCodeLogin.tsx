import React from 'react';
import QRCode from 'qrcode.react';
import './QRCodeLogin.css';

const QRCodeLogin = function (props: {appid: string; redirectUri: string}) {
    const parsedRedirectUri = encodeURI(props.redirectUri);
    const qrcodeURL = `https://open.weixin.qq.com/connect/qrconnect?` +
        `appid=${props.appid}&` +
        `redirect_uri=${parsedRedirectUri}&` +
        `response_type=code&` +
        `scope=snsapi_login&` +
        `state=STATUS&` +
        `#wechat_redirect`;
    console.log(qrcodeURL);
    return (
        <div className="qrcode-login">
            <QRCode value={qrcodeURL}
                renderAs="canvas"
                size={128}
                bgColor="#FFFFFF"
                fgColor="#000000"
                level="L"
                includeMargin={true} />
            <img src="https://open.weixin.qq.com/connect/qrconnect?appid=wxbdc5610cc59c1631&redirect_uri=https%3A%2F%2Fpassport.yhd.com%2Fwechat%2Fcallback.do&response_type=code&scope=snsapi_login&state=3d6be0a4035d839573b04816624a415e#wechat_redirect"/>
        </div>
    )
}

export default QRCodeLogin;