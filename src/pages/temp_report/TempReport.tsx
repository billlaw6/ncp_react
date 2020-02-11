import React, { FunctionComponent, useState, useRef } from "react";
import { Form, Input, Row, Col, Select, DatePicker, Radio } from "antd";
import moment, { Moment } from "moment";
import { connect, MapDispatchToProps } from "react-redux";

import { StoreStateI } from "_constants/interface";
import { MapStateToPropsI, MapDispatchToPropsI } from "./type";

import "./TempReport.less";
import { RadioChangeEvent } from "antd/lib/radio";

const { Item } = Form;
const { Option } = Select;

const TempReport: FunctionComponent<MapStateToPropsI & MapDispatchToPropsI> = props => {
  const { user } = props;
  const $form = useRef<HTMLFormElement>(null);

  const defaultTempReport = {
    name: user.name,
    emp_code: user.emp_code,
    department: user.department,
    is_fever: 0,
    temperature: 37.2,
    foreign_flag: 0,
    from_where: "",
  }
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

    // setIsEdit(false);
  };

  // 更新页面中的用户信息
  const updateInputVal = (e: React.FormEvent<HTMLInputElement>): void => {
    const $el = e.currentTarget;
    const { name, value } = $el;
    // if (name === "sign" && value.length > 30) return;
    setTempReport(Object.assign({}, tempReport, { [name]: value }));
  };

  return (
    <section className="temp-report">
      <div className="temp-report-header">每日体温上报</div>
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
                disabled={false}
                type="text"
                name="name"
                value={tempReport.name}
                onInput={updateInputVal}
              />
            </Item>
            <Item label="员工编码" colon={false}>
              <Input
                disabled={false}
                type="text"
                name="emp_code"
                value={tempReport.emp_code}
                onInput={updateInputVal}
              />
            </Item>
            <Item label="所属科室" colon={false}>
              <Input
                disabled={false}
                type="text"
                name="department"
                value={tempReport.department}
                onInput={updateInputVal}
              />
            </Item>
            <Row className="temp-report-hoz" gutter={22}>
              <Col span={12}>
                <Item label="是否发热" colon={false}>
                  <Radio.Group
                    className="temp-report-form-gender"
                    disabled={!isEdit}
                    value={tempReport.is_fever}
                    onChange={(e: RadioChangeEvent): void => {
                      // setTempReport(Object.assign({}, tempReport, { is_fever: e.value }));
                      console.log(e);
                    }
                    }
                  >
                    <Radio value={0}>
                      未发热
                    </Radio>
                    <Radio value={1}>
                      发热
                    </Radio>
                  </Radio.Group>
                  <Input
                    style={{ display: displayTemperature ? 'block' : 'none' }}
                    type="number"
                    name="temperature"
                    value={tempReport.temperature}
                    onChange={updateInputVal}
                  ></Input>
                </Item>
              </Col>
            </Row>
            <Item label="是否离京" colon={false}>
              <Radio.Group
                className="temp-report-form-gender"
                disabled={!isEdit}
                value={tempReport.foreign_flag}
                onChange={(e: RadioChangeEvent): void => {
                  // setTempReport(Object.assign({}, tempReport, { is_fever: e.value }));
                  console.log(e);
                }
                }
              >
                <Radio value={0}>
                  未离京
                    </Radio>
                <Radio value={1}>
                  离京归来
                    </Radio>
              </Radio.Group>
              <Input
                style={{ display: displayFromWhere ? 'block' : 'none' }}
                type="text"
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
              style={{ visibility: isEdit ? "visible" : "hidden" }}
            >
              <Col span={5}>
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
              <Col span={5}>
                <Item>
                  <Input
                    className="temp-report-form-submit"
                    type="button"
                    name="submit"
                    value="保存"
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
});
// const mapDispatchToProps: MapDispatchToPropsI = {
// };
export default connect(mapStateToProps)(TempReport);
