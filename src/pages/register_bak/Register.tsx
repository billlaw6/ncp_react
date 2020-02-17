import React, { FunctionComponent, useState, useRef } from "react";
import { Form, Input, Row, Col, Select, DatePicker } from "antd";
import moment, { Moment } from "moment";
import { connect, MapDispatchToProps } from "react-redux";

import { StoreStateI } from "_constants/interface";
import { MapStateToPropsI, MapDispatchToPropsI } from "./type";

import "./Register.less";
import { registerUser } from "_services/user";
import { setTokenAction, registerUserAction } from "_actions/user";

const { Item } = Form;
const { Option } = Select;

const Register: FunctionComponent<MapStateToPropsI & MapDispatchToPropsI> = props => {
  const { registerUserAction, setTokenAction } = props;
  const $form = useRef<HTMLFormElement>(null);

  const defaultUserRegister = {
    role: 1,
    cell_phone: "",
    name: "",
    password1: "",
    password2: "",
  };
  const [userRegister, setUserRegister] = useState(defaultUserRegister); //
  const [isEdit, setIsEdit] = useState(true); // 网页中的用户信息 默认为服务器端用户信息
  const defaultRegisterErrors = {
    cell_phone: "",
    name: "",
    password1: "",
    password2: "",
  }
  const [registerErrors, setRegisterErrors] = useState(defaultRegisterErrors); //

  // 取消修改
  const onCancel = (): void => {
    setUserRegister(defaultUserRegister);
  };
  // 提交修改
  const onSubmit = (): void => {
    // // 请求之前先清空本地token
    // setTokenAction("");
    // // 清空原报错信息
    // setRegisterErrors(defaultRegisterErrors);
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
    // registerUser(formData).then((res: any) => {
    //   console.log(res);
    // }).catch((err: any) => {
    //   console.log(err.response.data);
    // })
  };

  // 更新页面中的用户信息
  const updateInputVal = (e: React.FormEvent<HTMLInputElement>): void => {
    const $el = e.currentTarget;
    const { name, value } = $el;
    setUserRegister(Object.assign({}, userRegister, { [name]: value }));
  };

  // console.log("user: ", user);

  return (
    <section className="register">
      <div className="register-header">注册用户</div>
      <div className="register-statement">
        有工号的职工请直接使用工号<a href="/login">登录</a>，默认密码为111111
      </div>
      <div className="register-content">
        <form
          className="register-form"
          name="register"
          ref={$form}
          encType="multipart/form-data"
          method="post"
        >
          <div className="register-form-info">
            <Item label="手机号码" colon={false}>
              <Input
                disabled={false}
                type="string"
                name="cell_phone"
                value={userRegister.cell_phone}
                onInput={updateInputVal}
              />
            </Item>
            <Item label="姓名" colon={false}>
              <Input
                disabled={false}
                type="string"
                name="name"
                value={userRegister.name}
                onInput={updateInputVal}
              />
            </Item>
            <Item label="密码" colon={false}>
              <Input
                disabled={false}
                type="password"
                name="password1"
                value={userRegister.password1}
                onInput={updateInputVal}
              />
            </Item>
            <Item label="重复密码" colon={false}>
              <Input
                disabled={false}
                type="password"
                name="password2"
                value={userRegister.password2}
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
              <Col span={10}>
                <Item>
                  <Input
                    className="register-form-submit"
                    type="button"
                    name="submit"
                    value="注册"
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
const mapDispatchToProps: MapDispatchToPropsI = {
  setTokenAction: setTokenAction,
  registerUserAction: registerUserAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(Register);
