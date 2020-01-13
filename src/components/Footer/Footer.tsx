import React, { ReactElement } from "react";
import { Layout } from "antd";

import "./Footer.less";

const { Footer: AntdFooter } = Layout;

const Footer = (): ReactElement => (
  <AntdFooter id="footer">
    <div>
      <span>&#169;2019医影云</span>
      <span>
        <a href="#">隐私政策</a>
      </span>
    </div>
    <div>网站备案号</div>
  </AntdFooter>
);

export default Footer;
