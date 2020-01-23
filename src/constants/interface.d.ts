import { InputHTMLAttributes, DOMAttributes } from "react";

// Store相关接口
// 本地变量遵循js规范使用驼峰式全名，需要与后台数据库字段对应的变量使用下划线风格。

export declare interface LoginFormI {
  username: string;
  password: string;
  remember: boolean;
  messages: Array<string>;
}

export declare interface ProfileFormI {
  id: number;
  gender: number;
  birthday: Date;
  sign: string;
  address: string;
  username: string;
  unit: string;
  cell_phone: string;
}

export declare interface CurrentUserI {
  id: number;
  token: string;
  username: string;
  cell_phone: string;
  first_name?: string;
  last_name?: string;
  gender: number;
  birthday?: Date;
  sign: string;
  address: string;
  unit: string;
  avatar: string;
  // user_permissions?: Array<number>;
}

export declare interface UserInfoI {
  id: number;
  username: string;
  email: string;
  cell_phone: string;
  openid: string;
  unionid: string;
  // 数组定义方法一
  groups: number[];
  first_name?: string;
  last_name?: string;
  pinyin?: string;
  py?: string;
  gender: number;
  // 数组定义方法二
  user_permissions: Array<number>;
}

export declare interface SearchFormI {
  dtRange: Date[];
  keyword: string;
  fields?: string[];
}

export declare interface CollectionI {
  id: string;
  type: string;
  data: any;
}

export declare interface DicomPictureListI {
  id: string;
  mpr_order: number;
  frame_order: number;
  url: string;
}

export declare interface DicomPictureI {
  id: string;
  mpr_order: number;
  frame_order: number;
  collections: CollectionI[];
  url: string;
}

export declare interface DicomSeriesListI {
  id: string;
  series_number: number;
  mpr_flag: number;
  thumbnail: string;
}

export declare interface DicomSeriesI {
  id: string;
  thumbnail: string;
  study_id: string;
  patient_name: string;
  patient_id: string;
  sex: string;
  birthday: string;
  institution_name: string;
  window_width: number;
  window_center: number;
  modality: string;
  display_frame_rate: number;
  series_number: number;
  mpr_flag: number;
  pictures: DicomPictureListI[];
}

export declare interface ExamIndexListI {
  id: string;
  modality: string;
  patient_id: string;
  patient_name: string;
  sex: GenderEnum;
  birthday: string;
  institution_name: string;
  created_at: Date;
  desc: string;
  study_date: string;
  thumbnail: string;
  display_frame_rate: number;
}

export declare enum GenderEnum {
  UNKNOW = 0,
  MALE = 1,
  FEMALE = 2,
}

export declare interface ExamIndexI {
  id: string;
  modality: string;
  patient_name: string;
  created_at: Date;
  desc: string;
  patient_id: string;
  institution_name: string;
  study_date: string;
  thumbnail: string;
  display_frame_rate: number;
  series: DicomSeriesListI[];
}

export declare interface ExamIndexFormI {
  id: string;
  desc: string;
}

// 创建store时要遵循的rootState接口，不能使用rootReducers的类型
// 作为组件创建时props类型！！！必须用store.d里定义的！三天的教训！
export declare interface StoreStateI {
  router: { location: Location };
  loginForm: LoginFormI;
  currentUser: CurrentUserI;
  userInfo: UserInfoI;
  userInfoList: UserInfoI[];
  examSearchForm: SearchFormI;
  examIndexList: ExamIndexListI[];
  dicomSeriesList: DicomSeriesListI[];
  dicomPictureList: DicomPictureListI[];
}

export declare interface CustomHTMLDivElement extends HTMLDivElement {
  exitFullscreen: () => void;
  mozCancelFullScreen: () => void;
  webkitExitFullscreen: () => void;
  webkitRequestFullscreen: () => void;
}
