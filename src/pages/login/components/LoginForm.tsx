import React from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { IStoreState } from '../../../constants/store.d';
import { userLoginAction } from '../../../actions/user';
import {
    tokenFetchRequstedAction,
    tokenFetchSucceededAction,
    tokenFetchFailedAction
} from '../../../actions/token';
import { FormattedMessage } from 'react-intl';
import './login-form.less'

// 定义IProps，使内部能取到form，解决下面写法的后续报错
// class NormalLoginForm extends React.Component {
// Property 'form' does not exist on type 'Readonly<{}> & Readonly<{ children?: ReactNode; }>'.  TS2339

const mapStateToProps = (state: IStoreState) => ({
    user: state.user,
    token: state.token,
})
type IStateProps = ReturnType<typeof mapStateToProps>

const mapDispatchToProps = {
    tokenFetchRequstedAction,
    tokenFetchSucceededAction,
    tokenFetchFailedAction,
    userLoginAction,
}
type IDispatchProps = typeof mapDispatchToProps;

// type IProps = Readonly<{ form: any }>
type IProps = Readonly<{ form: any }> & IStateProps & IDispatchProps;

class NormalLoginForm extends React.Component<IProps> {
    handleSubmit = (e: any) => {
        e.preventDefault();
        this.props.form.validateFields((err: any, values: any) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.tokenFetchRequstedAction({
                    username: 'values',
                    password: 'abc',
                    token: '',
                    messages: [],
                });
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormattedMessage id='welcome' />
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ],
                    })(
                        <Input
                            prefix={
                                <Icon
                                    type="user"
                                    style={{ color: 'rgba(0,0,0,.25)' }}
                                />
                            }
                            placeholder="Username"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ],
                    })(
                        <Input
                            prefix={
                                <Icon
                                    type="lock"
                                    style={{ color: 'rgba(0,0,0,.25)' }}
                                />
                            }
                            type="password"
                            placeholder="Password"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(<Checkbox>Remember me</Checkbox>)}
                    <a className="login-form-forgot" href="">
                        Forgot password
                    </a>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button">
                        Log in
                    </Button>
                    Or <a href="">register now!</a>
                </Form.Item>
            </Form>
        );
    }
}

// 此处的<IProps>可加可不加
// const WrappedNormalLoginForm = Form.create<IProps>()( NormalLoginForm,);
const WrappedNormalLoginForm = Form.create({
})(
    NormalLoginForm,
);

// export default WrappedNormalLoginForm;
export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm);
