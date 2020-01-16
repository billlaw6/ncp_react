import React, { Component, ReactElement } from "react";
import { Upload as Uploader, Icon, Switch } from "antd";
import { RcFile, RcCustomRequestOptions } from "antd/lib/upload/interface";
import axios from "axios";

import { UploadStateI } from "./type";

import FileProgress from "_components/FileProgress/FileProgress";

import "./Upload.less";
import { FileProgressStatusEnum } from "_components/FileProgress/type";
import { Link } from "react-router-dom";

const { Dragger } = Uploader;

class Upload extends Component<{}, UploadStateI> {
  constructor(props: {}) {
    super(props);

    this.state = {
      uploadList: [],
      delPrivacy: true,
    };
  }

  // preUpload = (file: RcFile, FileList: RcFile[]): boolean | PromiseLike<void> => {
  //   return new Promise((resolve, reject) => {
  //     resolve(FileList);
  //   });
  // };

  customReq = (ops: RcCustomRequestOptions): void => {
    console.log("customReq: ", ops);
  };

  render(): ReactElement {
    const { delPrivacy } = this.state;
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
          <Dragger
            name="file"
            className="upload-uploader"
            directory
            // beforeUpload={this.preUpload}
            customRequest={this.customReq}
            showUploadList={false}
          >
            <Icon className="iconfont" type="inbox" />
            <p>点击或将文件拖拽到这里上传</p>
            <small>系统自动整理影像种类</small>
          </Dragger>
          <article className="upload-ctl">
            <div className="upload-ctl-header">
              <span>删除隐私</span>
              <Switch
                checked={delPrivacy}
                onClick={(): void => this.setState({ delPrivacy: !delPrivacy })}
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
          <FileProgress
            count={200}
            progress={10}
            status={FileProgressStatusEnum.PENDING}
          ></FileProgress>
          <FileProgress
            count={200}
            progress={100}
            status={FileProgressStatusEnum.SUCCESS}
            filePath={"/User/zhangboping/Download/aaa.jpg"}
          ></FileProgress>
          <FileProgress
            count={200}
            progress={80}
            status={FileProgressStatusEnum.FAIL}
          ></FileProgress>
        </div>
      </section>
    );
  }
}

export default Upload;
