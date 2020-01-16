import { FileProgressStatusEnum } from "_components/FileProgress/type";

export interface UploadStatusI {
  id: symbol;
  count: number;
  progress: number;
  status: FileProgressStatusEnum;
}

export interface UploadStateI {
  uploadList: UploadStatusI[];
  delPrivacy: boolean;
}
