import React from 'react';
import { Upload, Icon, message } from 'antd';
import { uploadDicomFile } from '../../../services/dicom';
import { AxiosResponse } from 'axios';

const { Dragger } = Upload;

const DicomUploader = () => {
  function handleDicomUpload (file: any): string {
    console.log(file);
    uploadDicomFile(file);
    return 'OK';
  };
  const props = {
    name: 'file',
    multiple: true,
    action: handleDicomUpload,
    onChange(info: any) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <Dragger {...props} method="POST">
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