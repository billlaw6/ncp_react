import React, { ReactNode } from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { IStoreState, ILoginState } from '../../../constants/store.d';
import { userLoginAction } from '../../../actions/user';
import {
    tokenFetchRequstedAction,
    tokenFetchSucceededAction,
    tokenFetchFailedAction
} from '../../../actions/token';
import { FormattedMessage } from 'react-intl';
import './login-form.less'

type IProps = Readonly<{ 
    form: any, 
    fields: ILoginState,
    onChange(fields: ILoginState): void,
    children?: ReactNode,
}>
// type IProps = Readonly<{ form: any }> & IStateProps & IDispatchProps;

class NormalLoginForm extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
        console.log(props);
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form className="login-form">
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
    name: 'global_state',
    onFieldsChange(props: IProps, changedFields: ILoginState) {
        props.onChange(changedFields);
    },
    mapPropsToFields(props: any) {
        return {
            username: Form.createFormField({
                ...props.username,
                value: props.username.value,
            }),
        };
    },
    onValuesChange(_, values) {
        console.log(values);
    },
})(
    NormalLoginForm,
);

export default WrappedNormalLoginForm;
// export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm);
