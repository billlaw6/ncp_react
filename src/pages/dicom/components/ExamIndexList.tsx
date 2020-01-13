import React from "react";
import { Table, Icon, Button, Input } from "antd";
import { IExamIndexList } from "../../../constants/interface";
import ExamIndex from "./ExamIndex";
import { FormattedMessage } from "react-intl";
import { Resizable } from "react-resizable";

// 组件不直接从reducer取数，通过父项传进来。
type IProps = {
  examIndexData: IExamIndexList[];
};

// 写object会取不到state的值
// class ExamIndexList extends React.Component<IProps, object> {
class ExamIndexList extends React.Component<IProps, any> {
  componentDidMount() {
    // To disabled submit button at the beginning.
    // console.log(this.props);
  }
  render() {
    const { examIndexData } = this.props;
    return (
      <div>
        {examIndexData.map((item, index) => {
          return (
            <div key={item.id}>
              <ExamIndex key={item.id} {...item}></ExamIndex>
            </div>
          );
        })}
      </div>
    );
  }
}

export default ExamIndexList;
