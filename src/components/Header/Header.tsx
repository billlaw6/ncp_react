import React from "react";
import { Menu, Icon } from "antd";
import { NavLink, Link, withRouter, RouteComponentProps } from "react-router-dom";
import { history } from "../../store/configureStore";
import logo from "../../assets/images/logo.svg";
import "../../assets/images/0.png";
import "./Header.less";

const { SubMenu } = Menu;

// class Header extends React.Component<IProps> {
class Header extends React.Component {
  state = {
    current: "mail",
  };

  handleClick = (e: any) => {
    console.log("click ", e);
    this.setState({
      current: e.key,
    });
    history.push("/login");
  };

  render() {
    return (
      <nav className="header">
        <div className="header-logo">Logo</div>
        <div className="header-menu">
          <ul className="header-menu-ul">
            <li>
              <NavLink to="/dicom" exact>
                影像
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

// export default withRouter(Header);
export default Header;
