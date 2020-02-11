import React, { FunctionComponent, useEffect, useState, useRef } from "react";
import { Form, Input, Row, Col, Select, DatePicker } from "antd";
import moment, { Moment } from "moment";
import { connect, MapDispatchToProps } from "react-redux";

import { StoreStateI } from "_constants/interface";
import { MapStateToPropsI, MapDispatchToPropsI } from "./type";

import "./Profile.less";
import { getDepartmentListAction, updateUserAction } from "_actions/user";

const { Item } = Form;
const { Option } = Select;

const Profile: FunctionComponent<MapStateToPropsI & MapDispatchToPropsI> = props => {
  const { user, departmentList, getDepartmentList, updateUser } = props;
  const $form = useRef<HTMLFormElement>(null);

  const [userInfo, setUserInfo] = useState(user); // 网页中的用户信息 默认为服务器端用户信息
  const [isEdit, setIsEdit] = useState(false); // 是否是编辑模式

  useEffect(() => {
    console.log("profile mounted");
    // console.log(user);
    getDepartmentList({ keyword: "" });
  }, []);

  // 取消修改
  const onCancel = (): void => {
    setUserInfo(user);
    setIsEdit(false);
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
    // console.groupEnd();
    // console.log(formData.get('id'));
    updateUser(formData);
    setIsEdit(false);
  };

  // 更新页面中的用户信息
  const updateInputVal = (e: React.FormEvent<HTMLInputElement>): void => {
    const $el = e.currentTarget;
    const { name, value } = $el;
    if (name === "emp_code" && value.length !== 5) return;
    setUserInfo(Object.assign({}, userInfo, { [name]: value }));
  };

  return (
    <section className="profile">
      <div className="profile-header">个人信息</div>
      <div className="profile-content">
        <form
          className="profile-form"
          name="profile"
          ref={$form}
          encType="multipart/form-data"
          method="post"
        >
          <div className={`profile-form-header ${isEdit ? "profile-editing" : ""}`}>
            <span onClick={(): void => setIsEdit(true)}>编辑信息</span>
          </div>
          <div className="profile-form-info">
            <Item label="姓名" colon={false}>
              <Input
                disabled={!isEdit}
                type="text"
                name="name"
                value={userInfo.name}
                onInput={updateInputVal}
              />
            </Item>
            <Item label="性别" colon={false}>
              <Select
                disabled={!isEdit}
                defaultValue={userInfo.gender}
                onChange={(value: number): void =>
                  setUserInfo(Object.assign({}, userInfo, { gender: value }))
                }
              >
                <Option value={0}>保密</Option>
                <Option value={1}>男</Option>
                <Option value={2}>女</Option>
              </Select>
              <Input
                style={{ display: 'none' }}
                disabled={!isEdit}
                type="text"
                name="gender"
                value={userInfo.gender}
                onInput={updateInputVal}
              />
            </Item>
            <Item label="年龄" colon={false}>
              <Input
                disabled={!isEdit}
                type="number"
                name="age"
                value={userInfo.age}
                onInput={updateInputVal}
              ></Input>
            </Item>
            <Item label="人员类别" colon={false}>
              <Select
                disabled={!isEdit}
                dropdownClassName="profile-form-gender"
                value={userInfo.role}
                onChange={(value: number): void =>
                  setUserInfo(Object.assign({}, userInfo, { role: value }))
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
                disabled={!isEdit}
                value={userInfo.role}
                onChange={updateInputVal}
              ></Input>
            </Item>
            <Item label="所在科室"
              style={{ display: userInfo.role === 0 ? 'block' : 'none' }}
              colon={false}>
              <Select
                disabled={!isEdit}
                showSearch
                defaultValue={userInfo.department}
                onChange={(value: string): void =>
                  setUserInfo(Object.assign({}, userInfo, { department: value }))
                }
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
              <Input
                style={{ display: "none" }}
                disabled={!isEdit}
                type="text"
                name="department"
                value={userInfo.department}
                onChange={updateInputVal}
              ></Input>
            </Item>
            <Item label="地址" colon={false}>
              <Input
                disabled={!isEdit}
                type="text"
                name="address"
                value={userInfo.address}
                onInput={updateInputVal}
              />
            </Item>
            <Item label="手机" colon={false}>
              <Input
                disabled={!isEdit}
                type="number"
                name="cell_phone"
                value={userInfo.cell_phone}
                onInput={updateInputVal}
              />
            </Item>
            <Row
              className="profile-form-btns"
              gutter={35}
              type="flex"
              align="middle"
              justify="center"
              style={{ visibility: isEdit ? "visible" : "hidden" }}
            >
              <Col span={5}>
                <Item>
                  <Input
                    className="profile-form-cancel"
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
                    className="profile-form-submit"
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
    </section >
  );
};

const mapStateToProps = (state: StoreStateI): MapStateToPropsI => ({
  user: state.user,
  departmentList: state.departmentList,
});
const mapDispatchToProps: MapDispatchToPropsI = {
  getDepartmentList: getDepartmentListAction,
  updateUser: updateUserAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
