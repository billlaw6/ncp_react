/* eslint-disable @typescript-eslint/camelcase */
import React from "react";
import { ExamIndexI } from "../../../constants/interface";
import { Icon } from "antd";
import "./ExamIndex.less";

class ExamIndex extends React.Component<ExamIndexI, object> {
  render() {
    const { thumbnail, patient_name, study_date, modality } = this.props;
    return (
      <div className="exam-index">
        <img src={thumbnail} alt="thumbnail"></img>
        <span className="patient-name">{patient_name}</span>
        <span className="study-date">{study_date}</span>
        <span className="modality">{modality}</span>
        <input name="desc" placeholder="备注"></input>
        <Icon type="writter"></Icon>
      </div>
    );
  }
}

export default ExamIndex;
