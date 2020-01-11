import React from 'react';
import { Link } from 'react-router-dom';
import qs from 'qs';
import { connect } from 'react-redux';
import { IStoreState } from '../../constants/interface';

class Oauth extends React.Component<any, any> {
    static getDerivedStateFromProps(nextProps: any, preState: any) {
        console.log(nextProps);
        console.log(preState);
        let query = nextProps.router.location.search.substr(1)
        console.log(query)
        let obj = qs.parse(query)
        console.log(obj);
        if (obj.code) {
            nextProps.setWeChatCodeAction(obj)
            console.log('wechat oauth2 login');
        } else {
            console.log('no code');
        }
        return null;
    }
    
    componentDidMount() {
        let query = this.props.router.location.search.substr(1)
        console.log(query)
        let obj = qs.parse(query)
        console.log(obj);
        if (obj.code) {
            this.props.setWeChatCodeAction(obj)
            console.log('wechat oauth2 login');
        } else {
            console.log('no code');
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

const mapStateToProps = (state: IStoreState) => {
    // console.log(state);
    return {
        router: state.router,
    };
};

export default connect(mapStateToProps)(Oauth);
