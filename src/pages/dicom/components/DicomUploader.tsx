import React from 'react';
import { Upload, Icon, message } from 'antd';
import { uploadDicomFile } from '../../../services/dicom';
import axios from '../../../services/api';
import md5 from 'blueimp-md5';

const { Dragger } = Upload;

const DicomUploader = () => {
  // function handleDicomUpload(file: any): Promise<string> {
  //   console.log(file);
  //   return new Promise((resolve) => {
  //     let formData = new FormData();
  //     formData.append('file', file);
  //     formData.append('filename', file.name);
  //     console.log(formData);
  //     uploadDicomFile(formData).then((res) => {
  //       console.log(res);
  //       resolve('dicom');
  //     }, (error) => {
  //       console.error(error);
  //     });
  //   });
  // };
  let headersAuthorization = '';
  const persistRoot = JSON.parse(localStorage.getItem('persist:root')!);
  if (persistRoot.currentUser && JSON.parse(persistRoot.currentUser).token.length > 2) {
    console.log('valid token');
    headersAuthorization = 'Token ' + JSON.parse(persistRoot.currentUser).token;
  }
  const props = {
    name: 'file',
    multiple: true,
    // customRequest: handleDicomUpload,
    action: `${axios.defaults.baseURL}` + 'dicom/upload/',
    // method: 'post',
    headers: {
      Authorization: headersAuthorization,
    },
    // onStart(file: any) {
    //   console.log('onStart', file, file.name);
    // },
    // onSuccess(ret: any, file: any) {
    //   console.log('onSuccess', ret, file.name);
    // },
    // onError(err: any) {
    //   console.log('onError', err);
    // },
    // onProgress({percent}: any, file: any) {
    //   console.log('onProgress', `${percent}%`, file.name);
    // },
    // onChange(info: any) {
    //   const { status } = info.file;
    //   if (status !== 'uploading') {
    //     console.log(info.file, info.fileList);
    //   }
    //   if (status === 'done') {
    //     message.success(`${info.file.name} file uploaded successfully.`);
    //   } else if (status === 'error') {
    //     message.error(`${info.file.name} file upload failed.`);
    //   }
    // },
  };

  return (
    <Dragger {...props} directory >
      <p className="ant-upload-drag-icon">
        <Icon type="inbox" />
      </p>
      <p className="ant-upload-text">Click or drag file to this area to upload</p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
        band files
    </p>
    </Dragger>
  );
}

export default DicomUploader;