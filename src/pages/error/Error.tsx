import React, { FunctionComponent } from "react";
import LinkButton from "_components/LinkButton/LinkButton";

import "./Error.less";

const Error: FunctionComponent = () => {
  return (
    <section className="error">
      <h1>404</h1>
      <p>很抱歉，您访问的页面找不到了</p>
      <LinkButton to="/">返回首页</LinkButton>
    </section>
  );
};

export default Error;
