import { IDicomSearchState } from '../../constants';
import {
    dicomSearchRequstedAction,
    dicomSearchSucceededAction,
    dicomSearchFailedAction,
} from '../actions/dicom';
import * as types from '../action-types';
import moment from 'moment';

// 设置本组件默认值
const defaultState: IDicomSearchState = {
    dtRange: [new Date((new Date().getTime() - 6 * 24 * 3600 * 1000)), new Date()],
    keyword: 'reduce initial',
    status: '',
    count: 0,
    results: [],
}

const dicomListReducer = (
    state = defaultState,
    action: ReturnType<typeof dicomSearchSucceededAction> &
        ReturnType<typeof dicomSearchFailedAction> &
        ReturnType<typeof dicomSearchRequstedAction>,
) => {
    if (!action) return state;

    switch (action.type) {
        // 全部CASE必须返回STATE类型的数据，以替换原来的STATE。actions文件中已经指定了payload的类型。
        case types.DICOM_SEARCH_REQUESTED_ACTION:
            return ({
                ...state,
                ...action.payload,
            })
        case types.DICOM_SEARCH_SUCCEEDED_ACTION:
            // 必须得写成后一种形式，返回state同样的数据格式不管用，会报“reducer "dicom" returned undefined.”类错误
            // console.log(action);
            // return action.payload;
            return ({
                ...state,
                ...action.payload,
            })
        case types.DICOM_SEARCH_FAILED_ACTION: {
            // return action.payload;
            return ({
                ...state,
                ...action.payload,
            })
        }
        default: {
            return state;
        }
    }
};
export default dicomListReducer;
