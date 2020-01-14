import React, { ReactElement, FunctionComponent, useState } from "react";
import { Card, Input } from "antd";
import { withRouter, RouteComponentProps } from "react-router-dom";
import holdimg from "_images/placeholder_270x262.png";
import "./DicomCard.less";

interface DicomCardPropsI {
  id: string;
  thumbnail?: string;
  patientName: string;
  studyDate: string;
  desc?: string;
  modality?: string;
  updateDesc?: Function;
}

const DicomCard: FunctionComponent<DicomCardPropsI & RouteComponentProps> = (
  props,
): ReactElement => {
  const { history, thumbnail, patientName, studyDate, modality = "未知", desc, updateDesc } = props;

  const [inputValue, changeInputValue] = useState(desc || "");
  const [showEditor, editDesc] = useState(false);

  return (
    <article className="dicom-card">
      <Card
        className="dicom-card-content"
        hoverable
        onClick={(): void => history.push("/player")}
        cover={<img src={thumbnail || holdimg}></img>}
      >
        <div className="dicom-card-info">
          <span>{patientName}</span>
          <span>{studyDate}</span>
        </div>
        <div className="dicom-card-type">{modality}</div>
      </Card>
      <div className={`dicom-card-desc ${showEditor ? "dicom-card-desc-editing" : ""}`}>
        <div className="dicom-card-desc-text">{desc || "备注"}</div>
        <span
          className="dicom-card-desc-edit iconfont icon_ic-edit"
          onClick={(): void => editDesc(true)}
        >
          +
        </span>
        <Input
          className="dicom-card-desc-editor"
          value={inputValue || ""}
          placeholder="备注"
          onInput={(value): void => changeInputValue(value.currentTarget.value)}
          addonAfter={
            <div className="dicom-card-desc-ctl">
              <span
                className="iconfont icon_ic-complete"
                onClick={(): void => {
                  updateDesc && updateDesc(inputValue);
                  editDesc(false);
                }}
              >
                Y
              </span>
              <span className="iconfont icon_ic-close" onClick={(): void => editDesc(false)}>
                N
              </span>
            </div>
          }
        ></Input>
      </div>
    </article>
  );
};

export default withRouter(DicomCard);
