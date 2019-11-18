import React, { ReactNode } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { ILoginState } from '../../../constants/store.d';
import { userLoginAction } from '../../../actions/user';
import { FormattedMessage } from 'react-intl';
import './login-form.less'

// type IProps = Readonly<{
//     form: any,
//     fields: ILoginState,
//     onChange(fields: ILoginState): void,
//     children?: ReactNode,
// }>
interface ILoginFormProps extends FormComponentProps {
    fields: ILoginState,
    onChange(fields: ILoginState): void,
    onSubmit(fields: ILoginState): void,
}

class NormalLoginForm extends React.Component<ILoginFormProps, any> {
    constructor(props: ILoginFormProps) {
        super(props);
        // console.log(props);
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
// const WrappedNormalLoginForm = Form.create<IProps>()( NormalLoginForm,);
const WrappedNormalLoginForm = Form.create<ILoginFormProps>({
    name: 'login_form',
    mapPropsToFields(props: any) {
        return {
            username: Form.createFormField({
                ...props.username,
                value: props.fields.username.value,
            }),
            password: Form.createFormField({
                ...props.username,
                value: props.fields.password.value,
            }),
        };
    },
    // validateMessages: {
    //     "username": {
    //         "errors": [
    //             {
    //                 "message": "Please input your username!",
    //                 "field": "username"
    //             }
    //         ]
    //     },
    //     "password": {
    //         "errors": [
    //             {
    //                 "message": "Please input your Password!",
    //                 "field": "password"
    //             }
    //         ]
    //     }
    // },
    onFieldsChange(props: ILoginFormProps, changedFields: any, allFields: ILoginState) {
        props.onChange(changedFields);
    },
    onValuesChange(_, values) {
        console.log(values);
    },
})(
    NormalLoginForm,
);

export default WrappedNormalLoginForm;
