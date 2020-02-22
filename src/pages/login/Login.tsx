import React, { FunctionComponent, useEffect, useState, useRef } from "react";
import { Carousel } from "antd";
import { connect } from "react-redux";

import {
  getDepartmentListAction,
  loginUserAction,
  setTokenAction,
  setUserAction,
} from "_actions/user";
import { loginUser, getUserInfo } from "_services/user";
import { StoreStateI } from "_constants/interface";

import { Form, Input, Row, Col, Select, DatePicker } from "antd";

import "./Login.less";
import { LoginPropsI, MapStateToPropsI, MapDispatchToPropsI } from "./type";
import { useHistory } from "react-router-dom";

const { Item } = Form;
const { Option } = Select;

const Login: FunctionComponent<LoginPropsI> = props => {
  const { loginUserAction, getDepartmentListAction, setTokenAction, setUserAction } = props;
  const history = useHistory();
  const $form = useRef<HTMLFormElement>(null);

  const defaultUserLogin = {
    username: "",
    password: "",
  };
  const [userLogin, setUserLogin] = useState(defaultUserLogin);
  const [errorMessage, setErrorMessage] = useState("");
  const [isEdit, setIsEdit] = useState(true);

  useEffect(() => {
    console.log("login mounted");
    getDepartmentListAction({ keyword: "" });
  }, []);

  const onSubmit = async () => {
    if (!$form.current) return setIsEdit(true);
    const formData = new FormData($form.current);
    /* ======== 此处添加update User Info action == START ======== */
    //  将 [formData] 作为 data
    /* ======== 此处添加update User Info action == END ======== */
    console.group(">>>>>>>>> Form Data In Page <<<<<<<<");
    formData.forEach((value, key) => {
      console.log(" Key: ", key, "  value: ", value);
    });
    console.groupEnd();
    // Action没有反馈，切换到直接网络请求
    // loginUserAction(formData);
    const res: any = await loginUser(formData);
    try {
      setTokenAction(res.data.key);
      const user_res: any = await getUserInfo();
      setUserAction(user_res.data);
      if (user_res.data.name === "") {
        history.push("/profile");
      } else {
        history.push("/temp-report");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateInputVal = (e: React.FormEvent<HTMLInputElement>): void => {
    const $el = e.currentTarget;
    const { name, value } = $el;
    if (name === "sign" && value.length > 30) return;
    setUserLogin(Object.assign({}, userLogin, { [name]: value }));
  };

  return (
    <section className="login">
      <div className="login-content">
        <span className="login-content-title">登录</span>
        <div className="register-statement">
          没有工号的用户请先使用手机号<a href="/register">注册</a>
          ，有工号的老师请直接用工号登录，默认密码：111111。
        </div>
        <div className="login-content">
          <form
            className="login-form"
            name="login"
            ref={$form}
            encType="multipart/form-data"
            method="post"
          >
            <div className="login-form-info">
              <Item label="手机号或工号" colon={false}>
                <Input
                  disabled={false}
                  type="string"
                  name="username"
                  value={userLogin.username}
                  onInput={updateInputVal}
                />
              </Item>
              <Item label="密码" colon={false}>
                <Input
                  disabled={false}
                  type="password"
                  name="password"
                  value={userLogin.password}
                  onInput={updateInputVal}
                />
              </Item>
              <Row
                className="login-form-btns"
                gutter={35}
                type="flex"
                align="middle"
                justify="center"
                style={{ visibility: "visible" }}
              >
                <Col span={10}>
                  <Item>
                    <Input
                      className="login-form-submit"
                      type="button"
                      name="submit"
                      value="登录"
                      onClick={onSubmit}
                    ></Input>
                  </Item>
                </Col>
              </Row>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state: StoreStateI): MapStateToPropsI => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps: MapDispatchToPropsI = {
  loginUserAction: loginUserAction,
  setTokenAction: setTokenAction,
  setUserAction: setUserAction,
  getDepartmentListAction: getDepartmentListAction,
};

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
export default connect(mapStateToProps, mapDispatchToProps)(Login);
