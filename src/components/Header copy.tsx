import React from 'react';
import { Menu, Icon } from 'antd';
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { history } from '../store/configureStore';
import logo from '../assets/images/logo.svg';
import '../assets/images/0.png';

const { SubMenu } = Menu;

declare interface IProps extends RouteComponentProps<any> {
  title?: string;
}

class Header extends React.Component<IProps> {
  state = {
    current: 'mail',
  };

  handleClick = (e: any) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
    history.push('/login');
  };

  render() {
    return (
      <Menu className="header-menu" onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
        <Menu.Item key="logo" className="header-logo">
          <img src={logo} alt="Logo" style={{ width: 100, height: 30 }}></img>
        </Menu.Item>

        <Menu.Item key="dicom" className="header-menu-item">
          <Link to="/dicom">文件</Link>
        </Menu.Item>

        <SubMenu
          className="header-user-info"
          title={
            <span className="submenu-title-wrapper">
              <img src={''} alt="avatar" style={{ width: 100, height: 30 }}></img>
            </span>
          }
        >
          <Menu.Item key="setting:3">Option 3</Menu.Item>
          <Menu.Item key="setting:4">Option 4</Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}

export default withRouter(Header);