import React from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import { FormComponentProps } from "antd/es/form";
import { ProfileFormI } from "../../../constants/interface";
import { FormattedMessage } from "react-intl";
import "./ProfileForm.less";

interface ProfileFormPropsI extends FormComponentProps {
  fields: any;
  onChange(fields: ProfileFormI): void;
  onSubmit(fields: ProfileFormI): void;
}

class ProfileForm extends React.Component<ProfileFormPropsI, any> {
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
      },
    );
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="profile-form">
        <FormattedMessage id="welcome" />
        <Form.Item>
          {getFieldDecorator("username", {
            rules: [
              {
                required: true,
                message: "Please input your username!",
              },
            ],
            validateTrigger: "onChange",
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [
              {
                required: true,
                message: "Please input your Password!",
              },
            ],
            validateTrigger: "onChange",
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("remember", {
            valuePropName: "remember",
            initialValue: false,
          })(<Checkbox>Remember me</Checkbox>)}
          <a className="profile-form-forgot" href="/password/reset/">
            Forgot password
          </a>
          <Button type="primary" htmlType="submit" className="profile-form-button">
            Log in
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

// 此处的<IProps>可加可不加
// const WrappedProfileForm = Form.create<IProps>()( ProfileForm,);
const WrappedProfileForm = Form.create<ProfileFormPropsI>({
  name: "profile_form",
  mapPropsToFields(props: ProfileFormPropsI) {
    // console.log(props.fields);
    return {
      username: Form.createFormField({
        ...props.fields,
        value: props.fields.username.value,
      }),
      password: Form.createFormField({
        ...props.fields,
        value: props.fields.password.value,
      }),
      remember: Form.createFormField({
        ...props.fields,
        value: props.fields.remember.value,
      }),
    };
  },
  // onFieldsChange(props: ProfileFormPropsI, changedFields: any, allFields: ProfileFormI) {
  //     console.log(changedFields);
  // },
  onValuesChange(props, changedValues, allValues) {
    // console.log(allValues);
    props.onChange(changedValues);
  },
})(ProfileForm);

export default WrappedProfileForm;
