import React, { FunctionComponent, useState, useRef } from "react";
import { Form, Input, Row, Col, Select, DatePicker } from "antd";
import moment, { Moment } from "moment";
import { connect, MapDispatchToProps } from "react-redux";

import { StoreStateI } from "_constants/interface";
import { MapStateToPropsI, MapDispatchToPropsI } from "./type";

import "./Register.less";
import { registerUserAction } from "_actions/user";

const { Item } = Form;
const { Option } = Select;

const Register: FunctionComponent<MapStateToPropsI & MapDispatchToPropsI> = props => {
  const { registerUserAction } = props;
  const $form = useRef<HTMLFormElement>(null);

  const defaultUserRegister = {
    role: 1,
    cell_phone: "",
    password: "",
    password1: "",
  }
  const [userRegister, setUserRegister] = useState(defaultUserRegister); // 网页中的用户信息 默认为服务器端用户信息
  const [isEdit, setIsEdit] = useState(true); // 网页中的用户信息 默认为服务器端用户信息

  // 取消修改
  const onCancel = (): void => {
    setUserRegister(defaultUserRegister);
  };
  // 提交修改
  const onSubmit = (): void => {
    if (!$form.current) return setIsEdit(true);
    const formData = new FormData($form.current);
    /* ======== 此处添加update User Info action == START ======== */
    //  将 [formData] 作为 data
    /* ======== 此处添加update User Info action == END ======== */
    // console.group(">>>>>>>>> Form Data In Page <<<<<<<<");
    // formData.forEach((value, key) => {
    //   console.log(" Key: ", key, "  value: ", value);
    // });
    // console.groupEnd();
    registerUserAction(formData);
  };

  // 更新页面中的用户信息
  const updateInputVal = (e: React.FormEvent<HTMLInputElement>): void => {
    const $el = e.currentTarget;
    const { name, value } = $el;
    if (name === "sign" && value.length > 30) return;
    setUserRegister(Object.assign({}, userRegister, { [name]: value }));
  };

  // console.log("user: ", user);

  return (
    <section className="register">
      <div className="register-header">注册用户</div>
      <div className="register-content">
        <form
          className="register-form"
          name="register"
          ref={$form}
          encType="multipart/form-data"
          method="post"
        >
          <div className="register-form-info">
            <Row className="register-hoz" gutter={22}>
              <Col span={12}>
                <Item label="人员类别" colon={false}>
                  <Select
                    dropdownClassName="register-form-gender"
                    disabled={false}
                    value={userRegister.role}
                    onChange={(value: number): void =>
                      setUserRegister(Object.assign({}, userRegister, { role: value }))
                    }
                  >
                    <Option value={0}>在职职工</Option>
                    <Option value={1}>外包公司</Option>
                    <Option value={2}>医辅人员</Option>
                    <Option value={3}>学生</Option>
                  </Select>
                  <Input
                    style={{ display: "none" }}
                    type="text"
                    name="role"
                    value={userRegister.role}
                    onChange={updateInputVal}
                  ></Input>
                </Item>
              </Col>
              <Item label="手机" colon={false}>
                <Input
                  disabled={true}
                  type="string"
                  name="cell_phone"
                  value={userRegister.cell_phone}
                  onInput={updateInputVal}
                />
              </Item>
              <Item label="密码" colon={false}>
                <Input
                  disabled={true}
                  type="password"
                  name="password"
                  value={userRegister.password}
                  onInput={updateInputVal}
                />
              </Item>
              <Item label="重复密码" colon={false}>
                <Input
                  disabled={true}
                  type="string"
                  name="password1"
                  value={userRegister.password1}
                  onInput={updateInputVal}
                />
              </Item>
              <Row
                className="register-form-btns"
                gutter={35}
                type="flex"
                align="middle"
                justify="center"
                style={{ visibility: "visible" }}
              >
                <Col span={5}>
                  <Item>
                    <Input
                      className="register-form-cancel"
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
                      className="register-form-submit"
                      type="button"
                      name="submit"
                      value="保存"
                      onClick={onSubmit}
                    ></Input>
                  </Item>
                </Col>
              </Row>
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
const mapDispatchToProps: MapDispatchToPropsI = {
  registerUserAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(Register);
