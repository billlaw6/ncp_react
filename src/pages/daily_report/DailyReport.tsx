import React, { FunctionComponent, useState, useRef } from "react";
import { Form, Button, Input, InputNumber, Row, Col, Select, DatePicker, Radio } from "antd";
import { FormComponentProps } from "antd/es/form";
import moment, { Moment } from "moment";
import { connect, MapDispatchToProps } from "react-redux";

import { StoreStateI } from "_constants/interface";
import { MapStateToPropsI, MapDispatchToPropsI } from "./type";

import "./DailyReport.less";
import { RadioChangeEvent } from "antd/lib/radio";
import { history } from "../../store/configureStore";

import { submitTempReport } from "_services/report";
import { getTempReportListAction } from "_actions/report";

const { Item } = Form;
const { Option } = Select;
const dateFormat = "YYYY-MM-DD HH:mm:ss";

interface TempReportFormProps extends FormComponentProps {
  // handleFieldsChange: any;
  // handleSubmit: any;
}

function hasErrors(fieldsError: any) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class TempReportForm extends React.Component<TempReportFormProps & MapStateToPropsI & MapDispatchToPropsI> {
  state = {
    checkTemperature: false,
    checkFromWhere: false,
  }
  componentDidMount() {
    this.props.form.validateFields();
  }

  handleFieldsChange = (changedFields: any): void => {
    console.log(changedFields)
  }

  // 取消修改
  onCancel = (): void => {
    // setTempReport(defaultTempReport);
  };

  // 提交修改
  onSubmit = (): void => {
    console.log('submit');
  };

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const { user, departmentList, getTempReportList } = this.props;

    return (
      <section className="temp-report">
        <Row type="flex" justify="start">
          <Col span={12}>
            <div className="temp-report-header">每日体温上报</div>
          </Col>
          <Col span={12}>
            <div className="profile-link">
              <a href="/profile">修改个人信息</a>
            </div>
          </Col>
        </Row>
        <div className="temp-report-content">
          <Form
            className="temp-report-form"
            name="temp-report"
            onSubmit={this.onSubmit}
          >
            <Item label="姓名" colon={false}>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: "姓名为必填项" }],
                initialValue: user.name,
              })(
                <Input disabled={true} type="text" name="name" />
              )}
            </Item>
            <Item label="员工编码" colon={false}>
              {getFieldDecorator('emp_code', {
                initialValue: user.emp_code,
              })(
                <Input disabled={true} type="text" name="emp_code" />
              )}
            </Item>
            <Item label="所在科室" colon={false}>
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
            <Item label="是否发热（高于37.2度)" colon={false}>
              {getFieldDecorator('is_fever', {
                rules: [{ required: true, message: "是否发热为必填项" }],
                // initialValue: 0,
              })(
                <Radio.Group
                  className="temp-report-form-gender"
                  disabled={false}
                  onChange={(e: any) => {
                    this.setState(
                      {
                        checkTemperature: e.target.value,
                      },
                      () => {
                        this.props.form.validateFields(['temperature'], { force: true })
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
              style={{ display: this.state.checkTemperature ? "block" : "none" }}
              colon={false}
            >
              {getFieldDecorator('temperature', {
                rules: [{ required: this.state.checkTemperature, message: "此为必填项" }]
              })(
                <InputNumber
                  name="temperature"
                  disabled={this.state.checkTemperature ? false : true}
                  max={45}
                  min={37.2}
                  precision={1}
                  step="0.1"
                ></InputNumber>
              )}摄氏度
            </Item>
            <Item label="是否离京" colon={false}>
              {getFieldDecorator('foreign_flag', {
                rules: [{ required: true, message: "此为必填项" }],
                initialValue: 0,
              })(
                <Radio.Group
                  className="temp-report-form-gender"
                  disabled={false}
                >
                  <Radio value={0}>未离京</Radio>
                  <Radio value={1}>离京</Radio>
                </Radio.Group>
              )}
            </Item>
            <Item
              label="所在位置"
              // style={{ display: tempReport.foreign_flag ? "block" : "none" }}
              colon={false}
            >
              {getFieldDecorator('from_where', {
                rules: [{ required: true, message: "此为必填项" }]
              })(
                <Input
                  type="text"
                  // disabled={tempReport.foreign_flag ? false : true}
                  name="from_where"
                ></Input>
              )}
            </Item>
            <Item >
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Item>
          </Form>
        </div>
      </section >
    );
  };
}

const WrappedTempReportForm = Form.create<TempReportFormProps>({
  name: "daily_report_form",
  onFieldsChange(props, changedFields, allValues) {
    console.log(changedFields);
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
  TempReportForm
);

const mapStateToProps = (state: StoreStateI): MapStateToPropsI => ({
  user: state.user,
  departmentList: state.departmentList,
});
const mapDispatchToProps: MapDispatchToPropsI = {
  getTempReportList: getTempReportListAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(WrappedTempReportForm);
