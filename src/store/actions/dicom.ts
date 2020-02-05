import { SearchFormI, DicomSeriesI, DicomPictureI, ExamIndexI } from "../../constants/interface";
import * as types from "../action-types";

// 用于在SAGA中触发请求
export const getExamIndexAction = (payload: SearchFormI) => ({
  type: types.GET_EXAM_INDEX_LIST,
  payload,
});

export const setExamIndexListAction = (payload: ExamIndexI[]) => ({
  type: types.SET_EXAM_INDEX_LIST,
  payload,
});

export const getDicomSeriesMprAction = (payload: string) => ({
  type: types.GET_DICOM_SERIES_MPR,
  payload,
});

export const setDicomSeriesMprAction = (payload: DicomSeriesI[]) => ({
  type: types.SET_DICOM_SERIES_MPR,
  payload,
});

export const getDicomSeriesAction = (payload: string) => ({
  type: types.GET_DICOM_SERIES,
  payload,
});

export const setDicomSeriesAction = (payload: DicomSeriesI[]) => ({
  type: types.SET_DICOM_SERIES,
  payload,
});

export const getDicomPicturesAction = (payload: string) => ({
  type: types.GET_DICOM_PICTURES,
  payload,
});

export const setDicomPicturesAction = (payload: DicomPictureI[]) => ({
  type: types.SET_DICOM_PICTURES,
  payload,
});
