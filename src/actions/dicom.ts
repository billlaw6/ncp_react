import { IDicomSearchState } from '../constants/store.d';

// 用于在SAGA中触发请求
export const DICOM_SEARCH_REQUESTED_ACTION = 'DICOM_SEARCH_REQUESTED_ACTION';
export const dicomSearchRequstedAction = (payload: IDicomSearchState) => ({
    type: DICOM_SEARCH_REQUESTED_ACTION,
    payload,
});
// 在SAGA中请求成功触发的动作
export const DICOM_SEARCH_SUCCEEDED_ACTION = 'DICOM_SEARCH_SUCCEEDED_ACTION';
export const dicomSearchSucceededAction = (payload: IDicomSearchState) => ({
    type: DICOM_SEARCH_SUCCEEDED_ACTION,
    payload,
});
// 在SAGA中请求失败时触发的动作
export const DICOM_SEARCH_FAILED_ACTION = 'DICOM_SEARCH_FAILED_ACTION';
export const dicomSearchFailedAction = (payload: IDicomSearchState) => ({
    type: DICOM_SEARCH_FAILED_ACTION,
    payload,
});
