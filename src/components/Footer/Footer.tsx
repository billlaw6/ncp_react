import React, { FC } from "react";
import { Layout } from "antd";
const { Footer } = Layout;

declare interface IFooterProps {
  className?: string;
  style?: React.CSSProperties;
}

class MyFooter extends React.Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    return <Footer className="footer">&copy;2019 医影云</Footer>;
  }
}

export default MyFooter;
