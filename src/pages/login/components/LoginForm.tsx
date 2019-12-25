import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { ILoginForm } from '../../../constants/interface';
import { FormattedMessage } from 'react-intl';
import './login-form.less'

interface ILoginFormProps extends FormComponentProps {
    fields: ILoginForm,
    onChange(fields: ILoginForm): void,
    onSubmit(fields: ILoginForm): void,
}

class LoginForm extends React.Component<ILoginFormProps, any> {
    componentDidMount() {
        // To disabled submit button at the beginning.
        // this.props.form.validateFields();
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
                        valuePropName: 'remember',
                        initialValue: false,
                    })(<Checkbox>Remember me</Checkbox>)}
                    <a className="login-form-forgot" href="/password/reset/">
                        Forgot password
                    </a>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button">
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

// 此处的<IProps>可加可不加
// const WrappedLoginForm = Form.create<IProps>()( LoginForm,);
const WrappedLoginForm = Form.create<ILoginFormProps>({
    name: 'login_form',
    mapPropsToFields(props: ILoginFormProps) {
        console.log(props.fields);
        return {
            username: Form.createFormField({
                value: props.fields.username,
            }),
            password: Form.createFormField({
                value: props.fields.password,
            }),
            remember: Form.createFormField({
                value: props.fields.remember,
            }),
        };
    },
    // onFieldsChange(props: ILoginFormProps, changedFields: any, allFields: ILoginForm) {
    //     console.log(changedFields);
    // },
    onValuesChange(props, changedValues, allValues) {
        // console.log(allValues);
        props.onChange(changedValues);
    },
})(LoginForm);

export default WrappedLoginForm;
