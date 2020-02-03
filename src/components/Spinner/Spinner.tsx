import React, { FunctionComponent, ReactNode, useState, ReactNodeArray, ReactElement } from "react";
import "./Spinner.less";
import { isNull, isBoolean, isUndefined } from "util";

interface DotsPropsI {
  total: number;
  current: number;
  onChange?: Function;
}

const Dots: FunctionComponent<DotsPropsI> = props => {
  const { total, current } = props;
  const dots: ReactNode[] = [];

  for (let i = 0; i < total; i++) {
    dots.push(
      <span
        key={`spinner-dots-item_${i}`}
        className={`spinner-dots-item ${current === i ? "spinner-active" : ""}`}
      >
        0
      </span>,
    );
  }

  return <div className="spinner-dots">{dots}</div>;
};

const Spinner: FunctionComponent = props => {
  const children = props.children as ReactNodeArray;
  const [countIndex, setCountIndex] = useState(0);

  if (!children || !children.length) {
    return null;
  }

  let list: ReactNodeArray = [children[0]];
  if (children.length > 1) {
    list = [...children, children[0]];
  }

  return (
    <div className="spinner">
      <div className="spinner-inner">
        {list.map((item, index) => {
          item = item as ReactElement;

          return (
            <div className="spinner-item" key={index}>
              {item}
            </div>
          );
        })}
      </div>
      <Dots total={children.length} current={countIndex}></Dots>
    </div>
  );
};

export default Spinner;
