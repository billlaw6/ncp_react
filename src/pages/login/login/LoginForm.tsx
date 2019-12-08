import React, { ReactNode } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { ILoginState } from '../../../constants/store';
import { userLoginAction } from '../../../store/actions/user';
import { FormattedMessage } from 'react-intl';
import './login-form.less'

interface ILoginFormProps extends FormComponentProps {
    fields: ILoginState,
    onChange(fields: ILoginState): void,
    onSubmit(fields: ILoginState): void,
}

class LoginForm extends React.Component<ILoginFormProps, any> {
    constructor(props: ILoginFormProps) {
        super(props);
        // console.log(props);
    }
    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }
    handleSubmit = (e: any) => {
        e.preventDefault();
        this.props.form.validateFields(
            // { force: true },    // 让已经校验通过的表单域在触发条件满足时再次检验。
            (err, values) => {
                if (!err) {
                    // console.log(values);
                    this.props.onSubmit(values);
                }
            }
        )
    }
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
                        validateTrigger: 'onChange',
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
// const WrappedLoginForm = Form.create<IProps>()( LoginForm,);
const WrappedLoginForm = Form.create<ILoginFormProps>({
    name: 'login_form',
    mapPropsToFields(props: any) {
        console.log(props.fields.username);
        return {
            username: Form.createFormField({
                ...props.fields.username,
                value: props.fields.username,
            }),
            password: Form.createFormField({
                ...props.fields.password,
                value: props.fields.password,
            }),
        };
    },
    // onFieldsChange(props: ILoginFormProps, changedFields: any, allFields: ILoginState) {
    //     console.log(changedFields);
    // },
    onValuesChange(props, changedValues, allValues) {
        // console.log(allValues);
        props.onChange(changedValues);
    },
})(LoginForm);

export default WrappedLoginForm;
