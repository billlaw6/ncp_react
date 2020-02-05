import { SearchFormI, ExamIndexI, DicomSeriesI, DicomPictureI } from "../../constants/interface";
import * as types from "../action-types";
import moment from "moment";
import {
  getExamIndexListAction,
  setExamIndexListAction,
  setDicomSeriesAction,
  setDicomPicturesAction,
} from "../actions/dicom";

const defaultExamIndexSearch: SearchFormI = {
  dtRange: [new Date(new Date().getTime() - 6 * 24 * 3600 * 1000), new Date()],
  keyword: "exam index",
  fields: ["patient_name"],
};
const examSearchReducer = (
  state = defaultExamIndexSearch,
  action: ReturnType<typeof getExamIndexListAction>,
) => {
  switch (action.type) {
    // 全部CASE必须返回STATE类型的数据，以替换原来的STATE。actions文件中已经指定了payload的类型。
    case types.GET_EXAM_INDEX_LIST:
      return {
        ...state,
        ...action.payload,
      };
    default: {
      return state;
    }
  }
};

const defaultExamIndexList: ExamIndexI[] = [];
const examIndexListReducer = (
  state = defaultExamIndexList,
  action: ReturnType<typeof setExamIndexListAction>,
) => {
  if (!action) return state;
  switch (action.type) {
    // 全部CASE必须返回STATE类型的数据，以替换原来的STATE。actions文件中已经指定了payload的类型。
    case types.SET_EXAM_INDEX_LIST:
      return action.payload;
    default: {
      return state;
    }
  }
};

const defaultDicomPictures: DicomPictureI[] = [];
const dicomPicturesReducer = (
  state = defaultDicomPictures,
  action: ReturnType<typeof setDicomPicturesAction>,
) => {
  if (!action) return state;
  switch (action.type) {
    // 全部CASE必须返回STATE类型的数据，以替换原来的STATE。actions文件中已经指定了payload的类型。
    case types.SET_DICOM_PICTURES:
      return action.payload;
    default: {
      return state;
    }
  }
};

const defaultDicomSeries: DicomSeriesI[] = [];
const dicomSeriesReducer = (
  state = defaultDicomSeries,
  action: ReturnType<typeof setDicomSeriesAction>,
) => {
  if (!action) return state;
  switch (action.type) {
    // 全部CASE必须返回STATE类型的数据，以替换原来的STATE。actions文件中已经指定了payload的类型。
    case types.SET_DICOM_SERIES:
      return action.payload;
    default: {
      return state;
    }
  }
};

export { examSearchReducer, examIndexListReducer, dicomSeriesReducer, dicomPicturesReducer };
