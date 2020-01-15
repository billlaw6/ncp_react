import React, { ReactElement, FunctionComponent, useState } from "react";
import { Card, Input, Skeleton, Icon } from "antd";
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
  const [loaded, switchLoading] = useState(true);

  return (
    <article className="dicom-card">
      <Card
        style={{ padding: loaded ? 20 : 0 }}
        className="dicom-card-content"
        onClick={(): void => history.push("/player")}
        cover={
          <>
            <Skeleton loading={loaded} active></Skeleton>
            <img
              src={thumbnail || holdimg}
              onLoad={(): void => {
                switchLoading(false);
              }}
            ></img>
          </>
        }
        // extra={<div>a</div>}
      >
        <div className="dicom-card-info">
          <span>{patientName}</span>
          <span>{studyDate}</span>
        </div>
        <div className="dicom-card-type">{modality}</div>
      </Card>
      <div className={`dicom-card-desc ${showEditor ? "dicom-card-desc-editing" : ""}`}>
        <div className="dicom-card-desc-text">
          <div>{desc || "备注"}</div>
          <Icon
            className="dicom-card-desc-edit iconfont icon_ic-edit"
            type="edit"
            onClick={(): void => editDesc(true)}
          />
        </div>
        <Input
          className="dicom-card-desc-editor"
          value={inputValue || ""}
          placeholder="备注"
          onInput={(value): void => changeInputValue(value.currentTarget.value)}
          addonAfter={
            <div className="dicom-card-desc-ctl">
              <Icon
                className="iconfont icon_ic-complete"
                type="check-circle"
                onClick={(): void => {
                  updateDesc && updateDesc(inputValue);
                  editDesc(false);
                }}
              />
              <Icon
                type="close-circle"
                className="iconfont icon_ic-close"
                onClick={(): void => editDesc(false)}
              />
            </div>
          }
        ></Input>
      </div>
    </article>
  );
};

export default withRouter(DicomCard);
