import React, { FunctionComponent, useState, useRef } from "react";
import { Form, Input, Row, Col, Select, DatePicker } from "antd";
import moment, { Moment } from "moment";
import { connect } from "react-redux";

import { StoreStateI } from "_constants/interface";
import { MapStateToPropsI } from "./tyle";

import "./Profile.less";
import DEFAULT_AVATAR from "_images/avatar.png";

const { Item } = Form;
const { Option } = Select;

const Profile: FunctionComponent<MapStateToPropsI> = props => {
  const { user } = props;
  const $form = useRef<HTMLFormElement>(null);

  const [userInfo, setUserInfo] = useState(user); // 网页中的用户信息 默认为服务器端用户信息
  const [isEdit, setIsEdit] = useState(false); // 是否是编辑模式

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
    setIsEdit(false);
  };

  const previewAvatar = (e: React.FormEvent<HTMLInputElement>): void => {
    const $el = e.currentTarget;
    const { files } = $el;
    if (!files) return;

    const avatarData = files[0];
    if (!avatarData) return;
    const url = URL.createObjectURL(avatarData);
    setUserInfo(Object.assign({}, userInfo, { avatar: url }));
  };

  // 更新页面中的用户信息
  const updateInputVal = (e: React.FormEvent<HTMLInputElement>): void => {
    const $el = e.currentTarget;
    const { name, value } = $el;
    if (name === "sign" && value.length > 30) return;
    setUserInfo(Object.assign({}, userInfo, { [name]: value }));
  };

  console.log("user: ", user);

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
            <Item className="profile-form-avatar">
              <Input
                disabled={!isEdit}
                type="file"
                name="avatar"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                onChange={previewAvatar}
              />
              <img src={userInfo.avatar || DEFAULT_AVATAR} alt="avatar" />
            </Item>
            <span onClick={(): void => setIsEdit(true)}>编辑信息</span>
            <div className="profile-form-avatar-desc">
              <span>选择新头像</span>
              <span>你可以选择PNG/JPG格式的图片作为头像</span>
            </div>
          </div>
          <div className="profile-form-info">
            <Item label="姓名" colon={false}>
              <Input
                disabled={!isEdit}
                type="text"
                name="username"
                value={userInfo.username}
                onInput={updateInputVal}
              />
            </Item>
            <Row className="profile-hoz" gutter={22}>
              <Col span={12}>
                <Item label="性别" colon={false}>
                  <Select
                    dropdownClassName="profile-form-gender"
                    disabled={!isEdit}
                    value={userInfo.gender}
                    onChange={(value: number): void =>
                      setUserInfo(Object.assign({}, userInfo, { gender: value }))
                    }
                  >
                    <Option value={0}>保密</Option>
                    <Option value={1}>男</Option>
                    <Option value={2}>女</Option>
                  </Select>
                  <Input
                    style={{ display: "none" }}
                    type="text"
                    name="gender"
                    value={userInfo.gender}
                    onChange={updateInputVal}
                  ></Input>
                </Item>
              </Col>
              <Col span={12}>
                <Item label="出生日期" colon={false}>
                  <DatePicker
                    className="profile-form-birthday"
                    disabled={!isEdit}
                    value={moment(userInfo.birthday ? Date.parse(userInfo.birthday) : Date.now())}
                    onChange={(date: Moment | null, dateString: string): void => {
                      setUserInfo(
                        Object.assign({}, userInfo, {
                          birthday: dateString,
                        }),
                      );
                    }}
                  ></DatePicker>
                  <Input
                    style={{ display: "none" }}
                    type="string"
                    name="birthday"
                    value={userInfo.birthday}
                    onInput={updateInputVal}
                  ></Input>
                </Item>
              </Col>
            </Row>
            <Item label="个性签名" colon={false}>
              <Input
                disabled={!isEdit}
                type="text"
                name="sign"
                value={userInfo.sign}
                onInput={updateInputVal}
                suffix={<span className="text-count">{userInfo.sign.length}/30</span>}
              />
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
    </section>
  );
};

const mapStateToProps = (state: StoreStateI): MapStateToPropsI => ({
  user: state.user,
});
export default connect(mapStateToProps)(Profile);
