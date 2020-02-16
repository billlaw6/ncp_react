import React, { FunctionComponent, useState, useRef } from "react";
import { Form, Button, Input, AutoComplete, InputNumber, Row, Col, Select, DatePicker, Radio } from "antd";
import { FormComponentProps } from "antd/es/form";
import moment, { Moment } from "moment";
import { connect, MapDispatchToProps } from "react-redux";

import { StoreStateI, RoleI } from "_constants/interface";
import { ProfilePropsI, ProfileStateI, MapStateToPropsI, MapDispatchToPropsI } from "./type";
import { history } from "../../store/configureStore";
import { updateUserInfo, getDutyList, getRoleList, getWorkStatusList } from "_services/user";

import "./Profile.less";

import { updateUserAction } from "_actions/user";

const { Item } = Form;
const { Option } = Select;
const dateFormat = "YYYY-MM-DD HH:mm:ss";

interface ProfileFormProps extends FormComponentProps {
  // handleFieldsChange: any;
  // handleSubmit: any;
}

function hasErrors(fieldsError: any) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class ProfileForm extends React.Component<ProfileFormProps & ProfilePropsI, ProfileStateI> {
  state = {
    // 本页面要用的字典
    roleList: [],
    dutyList: [],
    workDepartmentList: [],
    workStatusList: [],
    isEditable: true,
    isFever: false,
    foreignFlag: false,
    selectedRole: "",
  }

  componentDidMount() {
    getDutyList().then((res: any) => {
      this.setState({ dutyList: res.data });
    }).catch((error: any) => {
      console.log(error);
    })
    getRoleList().then((res: any) => {
      this.setState({ roleList: res.data });
    }).catch((error: any) => {
      console.log(error);
    })
    getWorkStatusList().then((res: any) => {
      this.setState({ workStatusList: res.data });
    }).catch((error: any) => {
      console.log(error);
    })
    this.setState({
      workDepartmentList: this.props.departmentList.map((item) => {
        return item.name + "(" + item.code + ")";
      })
    })
    this.props.form.validateFields();
  }

  // 取消修改
  onCancel = (): void => {
    // setProfile(defaultProfile);
  };

  // 提交修改
  onSubmit = (e: any): void => {
    e.preventDefault();
    // console.log('submit');
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        // console.log(values);
        this.props.updateUserAction(values);
      }
    })
  };

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const { user, departmentList, } = this.props;
    const { selectedRole, workDepartmentList } = this.state;   // 析构出来避免后面取值时this指代变化问题

    return (
      <div className="profile">
        <div className="profile-header">个人信息编辑</div>
        <div className="profile-content">
          <Form
            className="profile-form"
            name="profile"
            onSubmit={this.onSubmit}
          >
            <Item label="人员类别" colon={false}>
              {getFieldDecorator('role', {
                rules: [{ required: true, message: "请选择人员类别" }],
                initialValue: user.role,
              })(
                <Select
                  disabled={!this.state.isEditable}
                  showSearch
                  filterOption={(input, option) => {
                    // console.log(option.props.title);
                    if (option!.props!.title!.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                      option!.props!.value!.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0) {
                      return true;
                    } else {
                      return false;
                    }
                  }}
                  onChange={(value: string) => {
                    this.setState(
                      {
                        selectedRole: value,
                      },
                      () => {
                        // 修改完值后立即校验表单对应项
                        this.props.form.validateFields(['department'], { force: true });
                      },
                    );
                  }}
                >
                  {this.state.roleList.length > 0 ?
                    this.state.roleList.map((item: RoleI) => {
                      return (
                        <Option key={item.code} value={item.code} title={item.py}>{item.name}</Option>
                      )
                    }) :
                    <Option key={"empty"} value={"empty"} title={"empty"}>Empty</Option>
                  }
                </Select>
              )}
            </Item>
            <Item label="姓名" colon={false}>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: "请输入姓名" }],
                initialValue: user.name,
              })(
                <Input
                  disabled={!this.state.isEditable}
                  type="text"
                  name="name"
                />
              )}
            </Item>
            <Item label="性别" colon={false}>
              {getFieldDecorator('gender', {
                rules: [{ required: true, message: "请选择您的性别" }],
                initialValue: user.gender,
              })(
                <Select
                  disabled={!this.state.isEditable}
                >
                  <Option value={0}>保密</Option>
                  <Option value={1}>男</Option>
                  <Option value={2}>女</Option>
                </Select>
              )}
            </Item>
            <Item label="年龄" colon={false}>
              {getFieldDecorator('age', {
                rules: [{ required: true, message: "请录入您的年龄" }],
                initialValue: user.age ? user.age : 18,
              })(
                <Input
                  disabled={!this.state.isEditable}
                  type="number"
                  name="age"
                ></Input>
              )}
            </Item>
            <Item label="所属科室"
              style={{ display: selectedRole === '01' ? 'block' : 'none' }}
              colon={false}>
              {getFieldDecorator('department', {
                rules: [{ required: true, message: "请选择您所属的科室" }],
                initialValue: user.department,
              })(
                <Select
                  disabled={!this.state.isEditable}
                  showSearch
                  filterOption={(input, option) => {
                    // console.log(option.props.title);
                    if (option!.props!.title!.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                      option!.props!.value!.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0) {
                      return true;
                    } else {
                      return false;
                    }
                  }
                  }
                >
                  {departmentList.map((item) => {
                    return (
                      <Option key={item.code} value={item.code} title={item.py}>{item.name}</Option>
                    )
                  })}
                </Select>
              )}
            </Item>
            <Item label="当前工作科室（仅不在本科室工作或在各院区工作时填写）"
              style={{ display: selectedRole === '01' ? 'block' : 'none' }}
              colon={false}>
              {getFieldDecorator('work_department', {
                rules: [{ required: false, message: "所在位置为必填项" }],
                initialValue: user.work_department ? user.work_department : undefined,
              })(
                <AutoComplete
                  // dataSource={['abc', 'bcd']}
                  dataSource={workDepartmentList}
                  placeholder="工作科室"
                  filterOption={(inputValue: any, option: any) => {
                    // console.log(option.props.children);
                    return option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                  }}
                />
              )}
            </Item>
            <Item
              label="职务"
              colon={false}>
              {getFieldDecorator('duty', {
                rules: [{ required: false, message: "所在位置为必填项" }],
                initialValue: user.duty,
              })(
                <Select
                  disabled={true}
                  dropdownClassName="profile-form-gender"
                >
                  {this.state.dutyList.length > 0 ?
                    this.state.dutyList.map((item: RoleI) => {
                      return (
                        <Option key={item.code} value={item.code} title={item.py}>{item.name}</Option>
                      )
                    }) :
                    <Option key={"empty"} value={"empty"} title={"empty"}>Empty</Option>
                  }
                </Select>
              )}
            </Item>
            <Item
              label="人员状态"
              colon={false}>
              {getFieldDecorator('work_status', {
                rules: [{ required: false, message: "请选择当前状态" }],
                initialValue: user.work_status,
              })(
                <Select
                  disabled={false}
                  dropdownClassName="profile-form-gender"
                >
                  {this.state.workStatusList.length > 0 ?
                    this.state.workStatusList.map((item: RoleI) => {
                      return (
                        <Option key={item.code} value={item.code} title={item.py}>{item.name}</Option>
                      )
                    }) :
                    <Option key={"empty"} value={"empty"} title={"empty"}>Empty</Option>
                  }
                </Select>
              )}
            </Item>
            <Item label="手机" colon={false}>
              {getFieldDecorator('cell_phone', {
                rules: [{ required: false, message: "所在位置为必填项" }],
                initialValue: user.cell_phone,
              })(
                <Input
                  disabled={!this.state.isEditable}
                  type="number"
                  name="cell_phone"
                />
              )}
            </Item>
            <Item colon={false} className="profile-form-item">
              <Button className="profile-form-submit" type="primary" htmlType="submit">
                提交
              </Button>
            </Item>
          </Form>
        </div>
      </div>
    );
  };
}

const WrappedProfileForm = Form.create<ProfileFormProps>({
  name: "profile_form",
  onFieldsChange(props, changedFields, allValues) {
    // console.log(changedFields);
  },
})(
  ProfileForm
);

const mapStateToProps = (state: StoreStateI): MapStateToPropsI => ({
  user: state.user,
  departmentList: state.departmentList,
  dailyReportSearchForm: state.dailyReportSearchForm,
});
const mapDispatchToProps: MapDispatchToPropsI = {
  updateUserAction: updateUserAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(WrappedProfileForm);
