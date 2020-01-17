import React, { ReactElement } from "react";
import { Menu, Layout, Avatar, Dropdown } from "antd";
import { ClickParam } from "antd/lib/menu";

import logo from "_images/logo_temp.png";

import { HeaderPropsI } from "./type";

import "./Header.less";

const { Item: MenuItem, ItemGroup: MenuItemGroup, Divider } = Menu;
const { Header: AntdHeader } = Layout;

const getAvatarMenu = (props: HeaderPropsI): ReactElement => {
  const { username, cellPhone, logout } = props;

  const onClick = (e: ClickParam): void => {
    const { key } = e;
    if (key === "logout" && logout) logout();
  };

  return (
    <Menu className="header-avatar-menu" onClick={onClick}>
      <MenuItemGroup>
        <ul className="user">
          <li className="user-name">{username || "张三"}</li>
          <li className="user-cell-phone">{cellPhone || "138*****110"}</li>
        </ul>
      </MenuItemGroup>
      <Divider></Divider>
      <MenuItemGroup>
        <MenuItem className="edit-user-info" key="editUserInfo">
          <a href="#">个人信息编辑</a>
        </MenuItem>
        <MenuItem className="logout" key="logout">
          退出
        </MenuItem>
      </MenuItemGroup>
    </Menu>
  );
};

const Header = (props: HeaderPropsI): ReactElement => {
  const { avatar } = props;

  return (
    <AntdHeader id="header">
      <div className="header-content">
        <a className="logo" href="/">
          <img src={logo}></img>
        </a>
        <Dropdown
          className="avatar"
          overlay={getAvatarMenu(props)}
          overlayClassName="avatar-dropdown"
          placement="bottomRight"
        >
          {avatar ? (
            <Avatar size="default" src={avatar}></Avatar>
          ) : (
            <Avatar size="default" icon="user"></Avatar>
          )}
        </Dropdown>
      </div>
    </AntdHeader>
  );
};

export default Header;
