import React, { FunctionComponent, useState, useRef } from "react";
import { Form, Input, InputNumber, Row, Col, Select, DatePicker, Radio } from "antd";
import moment, { Moment } from "moment";
import { connect, MapDispatchToProps } from "react-redux";

import { StoreStateI } from "_constants/interface";
import { MapStateToPropsI, MapDispatchToPropsI } from "./type";

import "./TempReport.less";
import { RadioChangeEvent } from "antd/lib/radio";
import { history } from "../../store/configureStore";

import { submitTempReport } from "_services/report";
import { getTempReportListAction } from "_actions/report";

const { Item } = Form;
const { Option } = Select;
const dateFormat = "YYYY-MM-DD HH:mm:ss";

const TempReport: FunctionComponent<MapStateToPropsI & MapDispatchToPropsI> = props => {
  const { user, departmentList, getTempReportList } = props;
  const $form = useRef<HTMLFormElement>(null);

  const defaultTempReport = {
    name: user.name,
    emp_code: user.emp_code,
    department: user.department,
    is_fever: 0,
    temperature: 37.2,
    foreign_flag: 0,
    from_where: "",
  };
  const [tempReport, setTempReport] = useState(defaultTempReport); // 网页中的用户信息 默认为服务器端用户信息
  const [isEdit, setIsEdit] = useState(false); // 是否是编辑模式
  const [displayTemperature, setDisplayTemperature] = useState(false); // 是否显示体温录入框
  const [displayFromWhere, setDisplayFromWhere] = useState(false); // 是否显示从何处回来

  // 取消修改
  const onCancel = (): void => {
    setTempReport(defaultTempReport);
    // setIsEdit(false);
  };
  // 提交修改
  const onSubmit = (): void => {
    if (!$form.current) return setIsEdit(false);
    const formData = new FormData($form.current);
    /* ======== 此处添加update User Info action == START ======== */
    //  将 [formData] 作为 data
    /* ======== 此处添加update User Info action == END ======== */
    console.group(">>>>>>>>> Form Data In Page <<<<<<<<");
    formData.forEach((value, key) => {
      console.log(" Key: ", key, "  value: ", value);
    });
    console.groupEnd();
    submitTempReport(formData)
      .then(res => {
        // 提交后需要主动重新获取列表
        const todayStart = moment()
          .startOf("day")
          .format(dateFormat);
        const now = moment()
          .locale("zh-cn")
          .format(dateFormat);
        getTempReportList({ start: todayStart, end: now, keyword: "" });
        history.push("/");
      })
      .catch(err => {
        console.log(err);
      });

    // setIsEdit(false);
  };

  const updateInputVal = (e: React.FormEvent<HTMLInputElement>): void => {
    const $el = e.currentTarget;
    const { name, value } = $el;
    // if (name === "sign" && value.length > 30) return;
    setTempReport(Object.assign({}, tempReport, { [name]: value }));
  };

  const updateTemperatureVal = (value: number | undefined): void => {
    setTempReport(Object.assign({}, tempReport, { temperature: value }));
  };

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
        <form
          className="temp-report-form"
          name="temp-report"
          ref={$form}
          encType="multipart/form-data"
          method="post"
        >
          <div className="temp-report-form-info">
            <Item label="姓名" colon={false}>
              <Input
                disabled={true}
                type="text"
                name="name"
                value={tempReport.name}
                onInput={updateInputVal}
              />
            </Item>
            <Item label="员工编码" colon={false}>
              <Input
                disabled={true}
                type="text"
                name="emp_code"
                value={tempReport.emp_code}
                onInput={updateInputVal}
              />
            </Item>
            <Item label="所在科室" colon={false}>
              <Select
                disabled={true}
                showSearch
                defaultValue={tempReport.department}
                onChange={(value: string): void =>
                  setTempReport(Object.assign({}, tempReport, { department: value }))
                }
                filterOption={(input, option) => {
                  // console.log(option.props.title);
                  if (
                    option!
                      .props!.title!.toString()
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0 ||
                    option!
                      .props!.value!.toString()
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  ) {
                    return true;
                  } else {
                    return false;
                  }
                }}
              >
                {departmentList.map(item => {
                  return (
                    <Option key={item.code} value={item.code} title={item.py}>
                      {item.name}
                    </Option>
                  );
                })}
              </Select>
              <Input
                style={{ display: "none" }}
                disabled={true}
                type="text"
                name="department"
                value={tempReport.department}
                onChange={updateInputVal}
              ></Input>
            </Item>
            <Item label="是否发热（高于37.2度)" colon={false}>
              <Radio.Group
                className="temp-report-form-gender"
                disabled={false}
                value={tempReport.is_fever}
                onChange={(e: RadioChangeEvent): void => {
                  // console.log(e.target.value);;;;
                  setTempReport(Object.assign({}, tempReport, { is_fever: e.target.value }));
                }}
              >
                <Radio value={0}>未发热</Radio>
                <Radio value={1}>发热</Radio>
              </Radio.Group>
              <Input
                style={{ display: "none" }}
                type="text"
                name="is_fever"
                value={tempReport.is_fever}
                onChange={updateInputVal}
              ></Input>
            </Item>
            <Item
              label="具体温度"
              style={{ display: tempReport.is_fever ? "block" : "none" }}
              colon={false}
            >
              <InputNumber
                name="temperature"
                disabled={tempReport.is_fever ? false : true}
                max={45}
                min={37.2}
                precision={1}
                step="0.1"
                value={tempReport.temperature}
                onChange={updateTemperatureVal}
              ></InputNumber>
              摄氏度
            </Item>
            <Item label="是否离京" colon={false}>
              <Radio.Group
                className="temp-report-form-gender"
                disabled={false}
                value={tempReport.foreign_flag}
                onChange={(e: RadioChangeEvent): void => {
                  setTempReport(Object.assign({}, tempReport, { foreign_flag: e.target.value }));
                  // console.log(e);
                }}
              >
                <Radio value={0}>未离京</Radio>
                <Radio value={1}>离京</Radio>
              </Radio.Group>
              <Input
                style={{ display: "none" }}
                type="text"
                name="foreign_flag"
                value={tempReport.foreign_flag}
                onChange={updateInputVal}
              ></Input>
            </Item>
            <Item
              label="所在位置"
              style={{ display: tempReport.foreign_flag ? "block" : "none" }}
              colon={false}
            >
              <Input
                type="text"
                disabled={tempReport.foreign_flag ? false : true}
                name="from_where"
                value={tempReport.from_where}
                onChange={updateInputVal}
              ></Input>
            </Item>
            <Row
              className="temp-report-form-btns"
              gutter={35}
              type="flex"
              align="middle"
              justify="center"
              style={{ visibility: "visible" }}
            >
              <Col span={10}>
                <Item>
                  <Input
                    className="temp-report-form-cancel"
                    type="button"
                    name="cancel"
                    value="取消"
                    onClick={onCancel}
                  ></Input>
                </Item>
              </Col>
              <Col span={10}>
                <Item>
                  <Input
                    className="temp-report-form-submit"
                    type="button"
                    name="submit"
                    value="提交"
                    onClick={onSubmit}
                  ></Input>
                </Item>
              </Col>
            </Row>
          </div>
        </form>
      </div>
    </section>
  );
};

const mapStateToProps = (state: StoreStateI): MapStateToPropsI => ({
  user: state.user,
  departmentList: state.departmentList,
});
const mapDispatchToProps: MapDispatchToPropsI = {
  getTempReportList: getTempReportListAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(TempReport);
