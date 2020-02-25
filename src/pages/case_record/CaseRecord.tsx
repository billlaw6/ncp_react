import React, { FunctionComponent, useState, useRef } from "react";
import {
  Form,
  Button,
  Input,
  AutoComplete,
  InputNumber,
  Row,
  Col,
  Select,
  DatePicker,
  Radio,
} from "antd";
import { FormComponentProps } from "antd/es/form";
import moment, { Moment } from "moment";
import { connect, MapDispatchToProps } from "react-redux";

import { StoreStateI, RoleI } from "_constants/interface";
import { ProfilePropsI, ProfileStateI, MapStateToPropsI, MapDispatchToPropsI } from "./type";
import { history } from "../../store/configureStore";
import { updateUserInfo, getDutyList, getRoleList, getWorkStatusList } from "_services/user";
import { submitCaseRecord } from "_services/report";

import "./CaseRecord.less";

import { updateUserAction } from "_actions/user";
import { baseURL } from "_services/api";
import axios from "axios";

const { Item } = Form;
const { Option } = Select;
// const dateFormat = "YYYY-MM-DD HH:mm:ss";
const dateFormat = "YYYY-MM-DD";

interface ProfileFormProps extends FormComponentProps { }

class ProfileForm extends React.Component<ProfileFormProps & ProfilePropsI, ProfileStateI> {
  constructor(props: ProfileFormProps & ProfilePropsI) {
    super(props);
    this.state = {
      // 本页面要用的字典
      roleList: [],
      dutyList: [],
      workDepartmentList: [],
      workStatusList: [],
      isEditable: true,
      isFever: false,
      foreignFlag: false,
      selectedRole: "",
    };
  }

  componentDidMount() {
    this.props.form.validateFields();
  }

  cellPhoneValidator(rule: any, value: any, callback: Function): any {
    try {
      if (value) {
        if (!/^1[3456789]\d{9}$/.test(value)) {
          throw new Error("手机号码有误，请修正");
        } else {
          callback();
        }
      } else {
        callback();
      }
    } catch (err) {
      callback(err);
    }
  }

  // 提交修改
  handleSubmit = (e: any): void => {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        submitCaseRecord(values).then((res)=>{
          console.log(res);
        }).catch((err) => {
          console.log(err);
        })
      }
    });
  };

  handleDownloadClick = () => {
    // console.log("donwload clicked");
    const downloadUrl = baseURL + "report/case/download/";
    axios({
      method: "get",
      url: downloadUrl,
      params: this.props.dailyReportSearchForm,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
      responseType: "blob",
    }).then((res: any) => {
      // let blob = new Blob([res]);
      let blob = new Blob([res.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      let a = document.createElement("a");
      let objectUrl = URL.createObjectURL(blob); // 创建下载链接
      a.href = objectUrl;
      document.body.appendChild(a);
      a.click(); // 点击下载
      // a.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));
      document.body.removeChild(a);
      window.URL.revokeObjectURL(objectUrl); // 释放掉blob对象
    });
  };

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const { user, departmentList } = this.props;
    const { selectedRole, workDepartmentList } = this.state; // 析构出来避免后面取值时this指代变化问题

    return (
      <div className="case-record">
        <div className="case-record-header">病案录入</div>
        <div className="case-record-content">
          <Form className="case-record-form" name="case-record" onSubmit={this.handleSubmit}>
            <Item label="姓名" colon={false}>
              {getFieldDecorator("name", {
                rules: [{ required: true, message: "请输入姓名" }],
              })(<Input type="text" name="name" />)}
            </Item>
            <Item label="病案号" colon={false}>
              {getFieldDecorator("patient_no", {
                rules: [{ required: true, message: "请录入病案号" }],
              })(<Input type="number" name="age"></Input>)}
            </Item>
            <Item label="入院日期" colon={false}>
              {getFieldDecorator("check_in_date", {
                rules: [{ required: true, message: "请录入入院日期" }],
                initialValue: moment(),
              })(<DatePicker format={dateFormat}></DatePicker>)}
            </Item>
            <Item label="入院日期" colon={false}>
              {getFieldDecorator("check_out_date", {
                rules: [{ required: true, message: "请录入出院日期" }],
                initialValue: moment(),
              })(<DatePicker format={dateFormat}></DatePicker>)}
            </Item>
            <Item label="手术日期" colon={false}>
              {getFieldDecorator("operate_date", {
                rules: [{ required: true, message: "请录入手术日期" }],
                initialValue: moment(),
              })(<DatePicker format={dateFormat}></DatePicker>)}
            </Item>
            <Item label="造影日期" colon={false}>
              {getFieldDecorator("radio_date", {
                rules: [{ required: true, message: "请录入手术日期" }],
                initialValue: moment(),
              })(<DatePicker format={dateFormat}></DatePicker>)}
            </Item>
            {/* 分段########################################## */}
            <Item label="LM_病变长度mm" colon={false}>
              {getFieldDecorator("LM_lesion_length", {
                rules: [{ required: true, message: "请录入LM_病变长度mm" }],
              })(<Input type="number" name="LM_lesion_length"></Input>)}
            </Item>
            <Item label="LM_最小管腔面积mm2" colon={false}>
              {getFieldDecorator("LM_min_area", {
                rules: [{ required: true, message: "请录入LM_最小管腔面积mm2" }],
              })(<Input type="number" name="LM_min_area"></Input>)}
            </Item>
            <Item label="LM_直径狭窄DS%" colon={false}>
              {getFieldDecorator("LM_diameter_ratio", {
                rules: [{ required: true, message: "请录入LM_直径狭窄DS%" }],
              })(<Input type="number" name="LM_diameter_ratio"></Input>)}
            </Item>
            <Item label="LM_面积狭窄DS%" colon={false}>
              {getFieldDecorator("LM_area_ratio", {
                rules: [{ required: true, message: "请录入LM_面积狭窄DS%" }],
              })(<Input type="number" name="LM_area_ratio"></Input>)}
            </Item>
            <Item label="LM_QFR值" colon={false}>
              {getFieldDecorator("LM_qfr", {
                rules: [{ required: true, message: "请录入LM_QFR" }],
              })(<Input disabled={!this.state.isEditable} type="number" name="LM_qfr"></Input>)}
            </Item>
            {/* 分段########################################## */}
            <Item label="LAD_病变长度mm" colon={false}>
              {getFieldDecorator("LAD_lesion_length", {
                rules: [{ required: true, message: "请录入LAD_病变长度mm" }],
              })(<Input type="number" name="LAD_lesion_length"></Input>)}
            </Item>
            <Item label="LAD_最小管腔面积mm2" colon={false}>
              {getFieldDecorator("LAD_min_area", {
                rules: [{ required: true, message: "请录入LAD_最小管腔面积mm2" }],
              })(<Input type="number" name="LAD_min_area"></Input>)}
            </Item>
            <Item label="LAD_直径狭窄DS%" colon={false}>
              {getFieldDecorator("LAD_diameter_ratio", {
                rules: [{ required: true, message: "请录入LAD_直径狭窄DS%" }],
              })(<Input type="number" name="LAD_diameter_ratio"></Input>)}
            </Item>
            <Item label="LAD_面积狭窄DS%" colon={false}>
              {getFieldDecorator("LAD_area_ratio", {
                rules: [{ required: true, message: "请录入LAD_面积狭窄DS%" }],
              })(<Input type="number" name="LAD_area_ratio"></Input>)}
            </Item>
            <Item label="LAD_QFR值" colon={false}>
              {getFieldDecorator("LAD_qfr", {
                rules: [{ required: true, message: "请录入LAD_QFR" }],
              })(<Input disabled={!this.state.isEditable} type="number" name="LAD_qfr"></Input>)}
            </Item>
            {/* 分段########################################## */}
            <Item label="DIA1_病变长度mm" colon={false}>
              {getFieldDecorator("DIA1_lesion_length", {
                rules: [{ required: true, message: "请录入DIA1_病变长度mm" }],
              })(<Input type="number" name="DIA1_lesion_length"></Input>)}
            </Item>
            <Item label="DIA1_最小管腔面积mm2" colon={false}>
              {getFieldDecorator("DIA1_min_area", {
                rules: [{ required: true, message: "请录入DIA1_最小管腔面积mm2" }],
              })(<Input type="number" name="DIA1_min-area"></Input>)}
            </Item>
            <Item label="DIA1_直径狭窄DS%" colon={false}>
              {getFieldDecorator("DIA1_diameter_ratio", {
                rules: [{ required: true, message: "请录入DIA1_直径狭窄DS%" }],
              })(<Input type="number" name="DIA1_diameter_ratio"></Input>)}
            </Item>
            <Item label="DIA1_面积狭窄DS%" colon={false}>
              {getFieldDecorator("DIA1_area_ratio", {
                rules: [{ required: true, message: "请录入DIA1_面积狭窄DS%" }],
              })(<Input type="number" name="DIA1_area_ratio"></Input>)}
            </Item>
            <Item label="DIA1_QFR值" colon={false}>
              {getFieldDecorator("DIA1_qfr", {
                rules: [{ required: true, message: "请录入DIA1_QFR" }],
              })(<Input disabled={!this.state.isEditable} type="number" name="DIA1_qfr"></Input>)}
            </Item>
            {/* 分段########################################## */}
            <Item label="DIA2_病变长度mm" colon={false}>
              {getFieldDecorator("DIA2_lesion_length", {
                rules: [{ required: true, message: "请录入DIA2_病变长度mm" }],
              })(<Input type="number" name="DIA2_lesion_length"></Input>)}
            </Item>
            <Item label="DIA2_最小管腔面积mm2" colon={false}>
              {getFieldDecorator("DIA2_min_area", {
                rules: [{ required: true, message: "请录入DIA2_最小管腔面积mm2" }],
              })(<Input type="number" name="DIA2_min-area"></Input>)}
            </Item>
            <Item label="DIA2_直径狭窄DS%" colon={false}>
              {getFieldDecorator("DIA2_diameter_ratio", {
                rules: [{ required: true, message: "请录入DIA2_直径狭窄DS%" }],
              })(<Input type="number" name="DIA2_diameter_ratio"></Input>)}
            </Item>
            <Item label="DIA2_面积狭窄DS%" colon={false}>
              {getFieldDecorator("DIA2_area_ratio", {
                rules: [{ required: true, message: "请录入DIA2_面积狭窄DS%" }],
              })(<Input type="number" name="DIA2_area_ratio"></Input>)}
            </Item>
            <Item label="DIA2_QFR值" colon={false}>
              {getFieldDecorator("DIA2_qfr", {
                rules: [{ required: true, message: "请录入DIA2_QFR" }],
              })(<Input disabled={!this.state.isEditable} type="number" name="DIA2_qfr"></Input>)}
            </Item>
            {/* 分段########################################## */}
            <Item label="DIA3_病变长度mm" colon={false}>
              {getFieldDecorator("DIA3_lesion_length", {
                rules: [{ required: true, message: "请录入DIA3_病变长度mm" }],
              })(<Input type="number" name="DIA3_lesion_length"></Input>)}
            </Item>
            <Item label="DIA3_最小管腔面积mm2" colon={false}>
              {getFieldDecorator("DIA3_min_area", {
                rules: [{ required: true, message: "请录入DIA3_最小管腔面积mm2" }],
              })(<Input type="number" name="DIA3_min-area"></Input>)}
            </Item>
            <Item label="DIA3_直径狭窄DS%" colon={false}>
              {getFieldDecorator("DIA3_diameter_ratio", {
                rules: [{ required: true, message: "请录入DIA3_直径狭窄DS%" }],
              })(<Input type="number" name="DIA3_diameter_ratio"></Input>)}
            </Item>
            <Item label="DIA3_面积狭窄DS%" colon={false}>
              {getFieldDecorator("DIA3_area_ratio", {
                rules: [{ required: true, message: "请录入DIA3_面积狭窄DS%" }],
              })(<Input type="number" name="DIA3_area_ratio"></Input>)}
            </Item>
            <Item label="DIA3_QFR值" colon={false}>
              {getFieldDecorator("DIA3_qfr", {
                rules: [{ required: true, message: "请录入DIA3_QFR" }],
              })(<Input disabled={!this.state.isEditable} type="number" name="DIA3_qfr"></Input>)}
            </Item>
            <Item colon={false} className="case-record-form-item">
              <Button className="case-record-form-submit" type="primary" htmlType="submit">
                提交
              </Button>
            </Item>
          </Form>
          <Row>
            <Col>
              <Button
                style={{
                  margin: "15px",
                  float: "right",
                }}
                onClick={this.handleDownloadClick}
              >
                下载报告到Excel文件
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const WrappedProfileForm = Form.create<ProfileFormProps>({
  name: "case-record_form",
  onFieldsChange(props, changedFields, allValues) {
    // console.log(changedFields);
  },
})(ProfileForm);

const mapStateToProps = (state: StoreStateI): MapStateToPropsI => ({
  user: state.user,
  departmentList: state.departmentList,
  dailyReportSearchForm: state.dailyReportSearchForm,
});
const mapDispatchToProps: MapDispatchToPropsI = {
  updateUserAction: updateUserAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(WrappedProfileForm);
