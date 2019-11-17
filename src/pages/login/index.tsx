import React, { ChangeEventHandler } from 'react';
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import LoginFormRedux from './components/LoginFormRedux';
import QRCodeLogin from './components/QRCodeLogin';
import { userLoginAction, userLogoutAction } from '../../actions/user';
import { ILoginState, IStoreState } from '../../constants/store.d';
import WxLogin from './components/WxLogin';
import './index.less';

const mapStateToProps = (state: IStoreState) => {
    // console.log(state);
    return {
        router: state.router,
        user: state.user,
    };
};
type IStateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = {
    userLoginAction,
    userLogoutAction,
};
type IDispatchProps = typeof mapDispatchToProps;
type IProps = IStateProps & IDispatchProps;

type IState = {
    fields: {
        username: {
            value: string,
        },
        password: {
            value: string,
        },
    }
}
class Login extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            fields: {
                username: {
                    value: 'test',
                },
                password: {
                    value: 'tlksdf',
                }
            }
        }
    }

    handleFormChange = (changeFields: ILoginState) => {
        this.setState(({ fields }) => ({
            fields: { ...fields, ... changeFields },
        }));
    }

    render() {
        const fields  = this.state.fields;
        return (
            <div className="login-wrapper">
                <LoginFormRedux {...fields} />
            </div>
        );
    }
}

// export default Login;
export default connect(mapStateToProps, mapDispatchToProps)(Login);