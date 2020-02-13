import React, { FunctionComponent, useState, useRef } from "react";
import { Form, Input, Row, Col, Select, DatePicker, Radio } from "antd";
import moment, { Moment } from "moment";
import { connect, MapDispatchToProps } from "react-redux";

import { StoreStateI } from "_constants/interface";
import { MapStateToPropsI, MapDispatchToPropsI } from "./type";

import "./CadreReport.less";
import { RadioChangeEvent } from "antd/lib/radio";
import { history } from "../../store/configureStore";

import { submitCadreReport } from "_services/report";
import { getCadreReportListAction } from "_actions/report";

const { Item } = Form;
const { Option } = Select;
const dateFormat = "YYYY-MM-DD HH:mm:ss";

const CadreReport: FunctionComponent<MapStateToPropsI & MapDispatchToPropsI> = props => {
  const { user, departmentList, getCadreReportList } = props;
  const $form = useRef<HTMLFormElement>(null);

  const defaultCadreReport = {
    name: user.name,
    emp_code: user.emp_code,
    department: user.department,
    on_duty_flag: 0,
    reason: "",
  };
  const [cadreReport, setCadreReport] = useState(defaultCadreReport); // 网页中的用户信息 默认为服务器端用户信息
  const [isEdit, setIsEdit] = useState(false); // 是否是编辑模式
  const [displayCadreerature, setDisplayCadreerature] = useState(false); // 是否显示体温录入框
  const [displayFromWhere, setDisplayFromWhere] = useState(false); // 是否显示从何处回来

  // 取消修改
  const onCancel = (): void => {
    setCadreReport(defaultCadreReport);
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
    submitCadreReport(formData)
      .then(res => {
        // 提交后需要主动重新获取列表
        const todayStart = moment()
          .startOf("day")
          .format(dateFormat);
        const now = moment()
          .locale("zh-cn")
          .format(dateFormat);
        getCadreReportList({ start: todayStart, end: now, keyword: "" });
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
    setCadreReport(Object.assign({}, cadreReport, { [name]: value }));
  };

  return (
    <section className="temp-report">
      <div className="temp-report-header">每日干部在岗上报</div>
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
                value={cadreReport.name}
                onInput={updateInputVal}
              />
            </Item>
            <Item label="员工编码" colon={false}>
              <Input
                disabled={true}
                type="text"
                name="emp_code"
                value={cadreReport.emp_code}
                onInput={updateInputVal}
              />
            </Item>
            <Item label="所在科室" colon={false}>
              <Select
                disabled={!cadreReport.on_duty_flag}
                showSearch
                defaultValue={cadreReport.department}
                onChange={(value: string): void =>
                  setCadreReport(Object.assign({}, cadreReport, { department: value }))
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
                value={cadreReport.department}
                onChange={updateInputVal}
              ></Input>
            </Item>
            <Item label="是否在岗" colon={false}>
              <Radio.Group
                className="temp-report-form-gender"
                disabled={false}
                value={cadreReport.on_duty_flag}
                onChange={(e: RadioChangeEvent): void => {
                  setCadreReport(Object.assign({}, cadreReport, { on_duty_flag: e.target.value }));
                  // console.log(e);
                }}
              >
                <Radio value={0}>在岗</Radio>
                <Radio value={1}>不在岗</Radio>
              </Radio.Group>
              <Input
                style={{ display: "none" }}
                type="text"
                name="on_duty_flag"
                value={cadreReport.on_duty_flag}
                onChange={updateInputVal}
              ></Input>
            </Item>
            <Item
              label="不在岗原因"
              style={{ display: cadreReport.on_duty_flag ? "block" : "none" }}
              colon={false}
            >
              <Select
                showSearch
                defaultValue={cadreReport.reason}
                onChange={(value: string): void =>
                  setCadreReport(Object.assign({}, cadreReport, { reason: value }))
                }
              >
                <Option key={"xj"} value={"休假"} title={"xj"}>
                  休假
                </Option>
                <Option key={"wp"} value={"外派"} title={"wp"}>
                  外派
                </Option>
                <Option key={"cqcgjx"} value={"长期出国进修"} title={"cqcgxj"}>
                  长期出国进修
                </Option>
                <Option key={"glgc"} value={"隔离观察"} title={"glgc"}>
                  隔离观察
                </Option>
                <Option key={"qt"} value={"其它原因"} title={"qt"}>
                  其它原因
                </Option>
              </Select>
              {/* <Input
                style={{ display: cadreReport.reason === "其它原因：" ? "block" : "none" }}
                type="text"
                name="reason"
                value={cadreReport.reason}
                onChange={updateInputVal}
              ></Input> */}
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
  getCadreReportList: getCadreReportListAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(CadreReport);
