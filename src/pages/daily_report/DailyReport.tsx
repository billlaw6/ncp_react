import React, { FunctionComponent, useState, useRef } from "react";
import { Form, AutoComplete, Button, Input, InputNumber, Row, Col, Select, DatePicker, Radio } from "antd";
import { FormComponentProps } from "antd/es/form";
import moment, { Moment } from "moment";
import { connect, MapDispatchToProps } from "react-redux";

import { StoreStateI, WorkStatusI } from "_constants/interface";
import { DailyReportPropsI, DailyReportStateI, MapStateToPropsI, MapDispatchToPropsI } from "./type";
import { history } from "../../store/configureStore";

import "./DailyReport.less";
import { RadioChangeEvent } from "antd/lib/radio";

import { submitDailyReport } from "_services/report";
import { getWorkStatusList } from "_services/user";
import { getDailyReportListAction } from "_actions/report";

const { Item } = Form;
const { Option } = Select;
// const dateFormat = "YYYY-MM-DD HH:mm:ss";

interface DailyReportFormProps extends FormComponentProps {
}

function hasErrors(fieldsError: any) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class DailyReportForm extends React.Component<DailyReportFormProps & DailyReportPropsI, DailyReportStateI> {
  constructor(props: any) {
    super(props);
    this.temperatureValidator = this.temperatureValidator.bind(this); // 让函数内能取到组件的state和props
  }
  state = {
    showTemperature: false,
    showFromWhere: false,
    workStatusList: [],
    workDepartmentList: [],
  }
  componentDidMount() {
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
    // setDailyReport(defaultDailyReport);
  };

  // 提交修改
  onSubmit = (e: any): void => {
    console.log('submit');
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log(values);
        submitDailyReport(values).then((res) => {
          console.log(res);
          // console.log(typeof(this.props.dailyReportSearchForm.start))
          this.props.getDailyReportListAction(this.props.dailyReportSearchForm);
          history.push("/");
        }).catch((error) => {
          console.log(error);
        })
      } else {
        console.error(err);
      }
    })
  };

  temperatureValidator(rule: any, value: any, callback: Function): any {
    // console.log(value);
    // console.log(this.state.showTemperature);
    const { showTemperature } = this.state;
    try {
      console.log(value);
      if (showTemperature && value >= 42) {
        throw new Error('您着火了吧？');
      } else if (showTemperature && value === 37.2) {
        throw new Error('请填写具体温度');
      } else {
        callback();
      }
    } catch (err) {
      callback(err);
    }
  };

  render() {
    const { getFieldDecorator, getFieldValue, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const { user, departmentList, getDailyReportListAction } = this.props;
    const { showFromWhere, showTemperature, workDepartmentList } = this.state;

    return (
      <section className="daily-report">
        <Row type="flex" justify="start">
          <Col span={12}>
            <div className="daily-report-header">每日体温上报</div>
          </Col>
          <Col span={12}>
            <div className="profile-link">
              <a href="/profile">修改个人信息</a>
            </div>
          </Col>
        </Row>
        <div className="daily-report-content">
          <Form
            className="daily-report-form"
            name="daily-report"
            onSubmit={this.onSubmit}
          >
            <Item label="所属科室" colon={false}>
              {getFieldDecorator('department', {
                initialValue: user.department,
              })(
                <Select
                  disabled={true}
                  showSearch
                  filterOption={(input, option) => {
                    if (
                      option!.props!.title!.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                      option!.props!.value!.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0
                    ) {
                      return true;
                    } else {
                      return false;
                    }
                  }}>
                  {departmentList.map(item => {
                    return (
                      <Option key={item.code} value={item.code} title={item.py}>
                        {item.name}
                      </Option>
                    );;
                  })}
                </Select>
              )}
            </Item>
            <Item label="员工编码" colon={false}>
              {getFieldDecorator('emp_code', {
                initialValue: user.emp_code,
              })(
                <Input disabled={true} type="text" name="emp_code" />
              )}
            </Item>
            <Item label="姓名" colon={false}>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: "请输入姓名" }],
                initialValue: user.name,
              })(
                <Input disabled={true} type="text" name="name" />
              )}
            </Item>
            <Item
              label="人员状态"
              colon={false}>
              {getFieldDecorator('work_status', {
                rules: [{ required: true, message: "请选择当前状态" }],
                initialValue: user.work_status,
              })(
                <Select
                  disabled={false}
                  showSearch
                  dropdownClassName="profile-form-gender"
                  filterOption={(input, option) => {
                    // console.log(option.props.title);
                    if (option!.props!.title!.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                      option!.props!.value!.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0) {
                      return true;
                    } else {
                      return false;
                    }
                  }}
                >
                  {
                    this.state.workStatusList.length > 0 ?
                      this.state.workStatusList.map((item: WorkStatusI) => {
                        return (
                          <Option key={item.code} value={item.code} title={item.py}>{item.name}</Option>
                        )
                      }) :
                      <Option key={"empty"} value={"empty"} title={"empty"}>Empty</Option>
                  }
                </Select>
              )}
            </Item>
            <Item label="当前工作科室（仅不在本科室工作或在各院区工作时填写）"
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
            <Item label="是否发热（高于37.2度)" colon={false}>
              {getFieldDecorator('is_fever', {
                rules: [
                  { required: true, message: "是否发热为必填项" },
                ],
                initialValue: 0,
              })(
                <Radio.Group
                  className="daily-report-form-gender"
                  disabled={false}
                  onChange={(e: any) => {
                    this.setState(
                      {
                        showTemperature: e.target.value,
                      },
                      () => {
                        // 修改完值后立即校验表单对应项
                        this.props.form.validateFields(['temperature'], { force: true });
                        this.props.form.validateFields(['comments'], { force: true });
                      },
                    );
                  }}
                >
                  <Radio value={0}>未发热</Radio>
                  <Radio value={1}>发热</Radio>
                </Radio.Group>
              )}
            </Item>
            <Item
              label="具体温度"
              style={{ display: showTemperature ? "block" : "none" }}
              colon={false}
            >
              {getFieldDecorator('temperature', {
                rules: [
                  { required: showTemperature, message: "发热时具体温度为必填项" },
                  { validator: this.temperatureValidator },
                ],
                trigger: "onChange",
                initialValue: 37.2,
              })(
                <InputNumber
                  name="temperature"
                  disabled={!showTemperature}
                  max={45}
                  min={37.2}
                  precision={1}
                  step="0.1"
                ></InputNumber>
              )}摄氏度
            </Item>
            <Item
              label="备注"
              colon={false}
            >
              {getFieldDecorator('comments', {
                rules: [{ required: showTemperature, message: "有发热时请说明具体情况" }]
              })(
                <Input
                  type="text"
                  name="comments"
                ></Input>
              )}
            </Item>
            {/* <Item label="是否离京" colon={false}>
              {getFieldDecorator('foreign_flag', {
                rules: [{ required: true, message: "请选择是否离京" }],
                initialValue: 0,
              })(
                <Radio.Group
                  className="daily-report-form-gender"
                  disabled={false}
                  onChange={(e: any) => {
                    this.setState(
                      {
                        showFromWhere: e.target.value,
                      },
                      () => {
                        // 修改完值后立即校验表单对应项
                        this.props.form.validateFields(['temperature'], { force: true })
                      },
                    );
                  }}
                >
                  <Radio value={0}>未离京</Radio>
                  <Radio value={1}>离京</Radio>
                </Radio.Group>
              )}
            </Item>
            <Item
              label="所在位置"
              style={{ display: showFromWhere ? "block" : "none" }}
              colon={false}
            >
              {getFieldDecorator('at_where', {
                rules: [{ required: showFromWhere, message: "所在位置为必填项" }]
              })(
                <Input
                  type="text"
                  disabled={!showFromWhere}
                  name="at_where"
                ></Input>
              )}
            </Item> */}
            <Item className="daily-report-form-item">
              <Button type="primary" htmlType="submit" className="daily-report-form-item-submit">
                提交
              </Button>
            </Item>
          </Form>
        </div>
      </section >
    );
  };
}

const WrappedDailyReportForm = Form.create<DailyReportFormProps>({
  name: "daily_report_form",
  onFieldsChange(props, changedFields) {
    // console.log(changedFields);
  },
  // 用于将父组件的值传入表单项
  // mapPropsToFields(props) {
  //   return {
  //     name: Form.createFormField({
  //       value: props.user.name,
  //     })
  //   }
  // }
})(
  DailyReportForm
);

const mapStateToProps = (state: StoreStateI): MapStateToPropsI => ({
  user: state.user,
  departmentList: state.departmentList,
  dailyReportSearchForm: state.dailyReportSearchForm,
});
const mapDispatchToProps: MapDispatchToPropsI = {
  getDailyReportListAction: getDailyReportListAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(WrappedDailyReportForm);
