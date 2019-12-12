import { IDicomSearchState } from '../../constants';
import * as types from '../action-types';

// 用于在SAGA中触发请求

export const dicomSearchRequstedAction = (payload: IDicomSearchState) => ({
    type: types.DICOM_SEARCH_REQUESTED_ACTION,
    payload,
});
// 在SAGA中请求成功触发的动作
export const dicomSearchSucceededAction = (payload: IDicomSearchState) => ({
    type: types.DICOM_SEARCH_SUCCEEDED_ACTION,
    payload,
});
// 在SAGA中请求失败时触发的动作
export const dicomSearchFailedAction = (payload: IDicomSearchState) => ({
    type: types.DICOM_SEARCH_FAILED_ACTION,
    payload,
});
