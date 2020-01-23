export interface SeriesI {
  id: string;
  series_number: number;
  mpr_flag: mprFlagType;
  window_width: number;
  window_center: number;
  thumbnail: string;
}

export interface PatientI {
  patient_name: string;
  patient_id: string;
  birthday: string;
  sex: string;
  study_date: string;
  institution_name: string;
  modality: string;
}

export interface ImageI {
  id: string;
  mpr_order: mprOrderType;
  frame_order: number;
  url: string;
}

type mprFlagType = 0 | 1;
type mprOrderType = 0 | 1 | 2;

export interface SeriesCacheListI {
  [key: number]: HTMLImageElement[];
}

export interface PlayerStateI {
  seriesIndex: number; // 当前序列索引
  imgIndex: number[]; // 所有序列的当前图像索引
  play: boolean; // 是否在播放
  fullscreen: boolean; // is fullscreen mode
  $wrapper: Element | null; // wrapper element
  wrapperClassName: string; // wrapper element classname
  showInfo: boolean; // 是否显示病人信息
  showPanels: boolean; // 全屏时是否显示info、list、ctl等
  seriesCacheList: SeriesCacheListI; // 正常模式下 序列图像的缓存

  /* 下面👇的是临时的state */
  seriesList: SeriesI[];
  imageList: ImageI[];
}
