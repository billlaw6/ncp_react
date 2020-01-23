import React, { FunctionComponent, ReactNode } from "react";
import { Link } from "react-router-dom";
import { isString } from "util";
import { Icon } from "antd";

import { LinkButtonPropsI } from "./type";

import "./LinkButton.less";

const LinkButton: FunctionComponent<LinkButtonPropsI> = props => {
  const { children, icon, iconPos, className, ...args } = props;
  const insertIcon = (): ReactNode => {
    if (!icon) return undefined;

    const attrs = {
      style:
        iconPos === "after"
          ? {
              order: 999,
              marginLeft: 6,
            }
          : {
              order: -1,
              marginRight: 6,
            },
      className: "link-btn-icon",
    };

    if (isString(icon)) return <Icon {...attrs} type={icon}></Icon>;
    return <i {...attrs}>{icon}</i>;
  };

  return (
    <Link className={`link-btn ${className}`} {...args}>
      {insertIcon()}
      {children}
    </Link>
  );
};

export default LinkButton;
