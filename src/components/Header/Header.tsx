import React, { FunctionComponent, ReactElement } from "react";
import { Menu, Layout, Avatar, Dropdown } from "antd";
import { ClickParam } from "antd/lib/menu";

import { HeaderPropsI } from "./type";

import "./Header.less";
import { Link } from "react-router-dom";

const { Item: MenuItem, ItemGroup: MenuItemGroup, Divider } = Menu;
const { Header: AntdHeader } = Layout;

const getAvatarMenu: FunctionComponent<HeaderPropsI> = (props): ReactElement => {
  const { name, empCode, cellPhone, logout, duty } = props;

  const onClick = (e: ClickParam): void => {
    const { key } = e;
    if (key === "logout" && logout) logout();
  };

  return (
    <Menu className="header-avatar-menu" onClick={onClick}>
      <MenuItemGroup>
        <ul className="user">
          <li className="user-name">{name || "未登录"}</li>
          <li className="emp-code">{empCode || "未填写"}</li>
          <li className="user-cell-phone">{cellPhone || "未填写"}</li>
        </ul>
      </MenuItemGroup>
      <Divider></Divider>
      <MenuItemGroup>
        <MenuItem className="edit-user-info" key="editUserInfo">
          <Link to="/profile">个人信息编辑</Link>
        </MenuItem>
      </MenuItemGroup>
      <Divider></Divider>
      <MenuItemGroup>
        <MenuItem>
          <Link to="/daily-report">新建上报</Link>
        </MenuItem>
      </MenuItemGroup>
      <Divider></Divider>
      <MenuItemGroup>
        <MenuItem className="logout" key="logout">
          退出
        </MenuItem>
      </MenuItemGroup>
    </Menu>
  );
};

const Header: FunctionComponent<HeaderPropsI> = (props): ReactElement => {
  const { name, empCode, cellPhone, logout } = props;

  return (
    <AntdHeader id="header">
      <div className="header-content">
        <a className="logo" href="/">
          北医三院抗疫日报平台
        </a>

        <Dropdown
          className="avatar"
          overlay={getAvatarMenu(props)}
          overlayClassName="avatar-dropdown"
          placement="bottomRight"
        >
          <Avatar size="default" icon="user"></Avatar>
        </Dropdown>
      </div>
    </AntdHeader>
  );
};

export default Header;
