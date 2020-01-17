import React, { useState, FunctionComponent } from "react";
import { Icon, Switch } from "antd";
import { useDropzone } from "react-dropzone";
import axios from "axios";

import { UploadStatusI } from "./type";

import FileProgress from "_components/FileProgress/FileProgress";

import "./Upload.less";
import { Link } from "react-router-dom";
import { FileProgressStatusEnum } from "_components/FileProgress/type";

// let headersAuthorization = "";
// const persistRootStr = localStorage.getItem("persist:root");
// if (!isNull(persistRootStr)) {
//   const persistRoot = JSON.parse(persistRootStr);
//   if (
//     persistRoot.currentUser &&
//     JSON.parse(persistRoot.currentUser).token &&
//     JSON.parse(persistRoot.currentUser).token.length > 2
//   ) {
//     console.log("valid token");
//     headersAuthorization = "Token " + JSON.parse(persistRoot.currentUser).token;
//   }
// }

const Upload: FunctionComponent = () => {
  const [currentLoad, updateCurrentLoad] = useState<UploadStatusI | undefined>(undefined);
  const [uploadList, updateLoadList] = useState<UploadStatusI[]>([]);
  const [delPrivacy, changeDelPrivacy] = useState(true);

  const _updateLoadList = (item: UploadStatusI): void => {
    const { id, status } = item;
    const nextupLoadList = uploadList.map(sub => {
      if (sub.id === id) {
        if (status === FileProgressStatusEnum.FAIL) {
          item.progress = sub.progress;
        }

        return item;
      }
      return sub;
    });

    updateLoadList(nextupLoadList);
    updateCurrentLoad(undefined);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDropAccepted: files => {
      if (files && files.length) {
        const progressInfo: UploadStatusI = {
          id: `${uploadList.length}`,
          count: files.length,
          progress: 0,
          status: FileProgressStatusEnum.PENDING,
        };

        const nextUploadList = [...uploadList, progressInfo];
        updateLoadList(nextUploadList);

        const formData = new FormData();
        files.map(item => {
          formData.append("file", item);
        });

        axios
          // .post(`http://173.242.127.101:30178/upload`, formData, {
          .post(`http://192.168.1.220:3002/upload`, formData, {
            // .post(`${axios.defaults.baseURL}dicom/upload/`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              // Authorization: headersAuthorization,
            },
            onUploadProgress: function(progressEvent: any) {
              console.log("progressEvent: ", progressEvent);
              const { loaded, total } = progressEvent;
              updateCurrentLoad(
                Object.assign({}, progressInfo, {
                  progress: (loaded / total) * 100,
                }),
              );
            },
          })
          .then(result => {
            // console.log("result: ", uploadList);
            updateCurrentLoad(
              Object.assign({}, progressInfo, {
                progress: 100,
                status: FileProgressStatusEnum.SUCCESS,
              }),
            );
          })
          .catch(err => {
            updateCurrentLoad(
              Object.assign({}, progressInfo, {
                status: FileProgressStatusEnum.FAIL,
              }),
            );
          });
      }
    },
  });

  console.log("updateLoadList", uploadList);
  if (currentLoad && currentLoad.id) {
    _updateLoadList(currentLoad);
  }

  return (
    <section className="upload">
      <div className="upload-header">
        <h1>上传</h1>
        <Link className="upload-back" to="/">
          <Icon className="iconfont" type="arrow-left" />
          <span>返回</span>
        </Link>
      </div>
      <div className="upload-content">
        <div {...getRootProps({ className: "upload-uploader" })}>
          <input {...getInputProps({ name: "file", multiple: true })} />
          <Icon className="iconfont" type="inbox" />
          <p>点击或将文件拖拽到这里上传</p>
          <small>系统自动整理影像种类</small>
        </div>
        <article className="upload-ctl">
          <div className="upload-ctl-header">
            <span>删除隐私</span>
            <Switch
              checked={delPrivacy}
              onClick={(): void => changeDelPrivacy(!delPrivacy)}
            ></Switch>
          </div>
          <div className="upload-ctl-content">
            <p> 为了保护患者隐私,我们提供患者信息删除功能 </p>
            <ul>
              <li>· 开启隐私删除,将文件拖拽进来,系统将自动删除患者所有信息。</li>
              <li>· 影像删除后将无法找回，你可以重新上传影像来获取信息。</li>
            </ul>
          </div>
        </article>
      </div>
      <div className="upload-list">
        {uploadList.map(item => {
          console.log("1111", item);
          const { id, ...others } = item;

          return <FileProgress key={id} {...others}></FileProgress>;
        })}
      </div>
    </section>
  );
};

export default Upload;
