import React, { Component, ReactElement } from "react";
import { Layout } from "antd";
import { connect } from "react-redux";

/* components */
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { StoreStateI } from "../constants/interface";

/* style */
import "./Default.less";

const { Content } = Layout;

class DefalutLayout extends Component<StoreStateI> {
  render(): ReactElement {
    const { children, currentUser } = this.props;
    const { avatar, username, cell_phone: cellPhone } = currentUser;

    return (
      <Layout id="defaultLayout">
        <Header avatar={avatar} username={username} cellPhone={cellPhone}></Header>
        <Content id="content">{children}</Content>
        <Footer></Footer>
      </Layout>
    );
  }
}

const mapStateToProps = (state: StoreStateI): StoreStateI => state;
export default connect(mapStateToProps)(DefalutLayout);
