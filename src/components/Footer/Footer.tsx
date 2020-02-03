import React, { ReactElement } from "react";
import { Layout, Icon } from "antd";

import "./Footer.less";

const { Footer: AntdFooter } = Layout;

const Footer = (): ReactElement => (
  <AntdFooter id="footer">
    <span style={{ display: "inline-flex", alignItems: "center" }}>
      <Icon type="copyright"></Icon>2019医影云
    </span>
    <span>
      <a href="#">隐私政策</a>
    </span>
    <a href="http://beian.miit.gov.cn">京ICP备19054124号-1</a>
  </AntdFooter>
);

export default Footer;
