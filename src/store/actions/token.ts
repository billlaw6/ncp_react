import * as types from '../action-types';
import { ILoginState, IStoreState } from '../../constants';

// 用于在SAGA中触发请求
export const tokenFetchRequstedAction = (payload: ILoginState) => ({
    type: types.TOKEN_FETCH_REQUESTED_ACTION,
    payload,
});
// 在SAGA中请求成功触发的动作

export const tokenFetchSucceededAction = (payload: ILoginState) => ({
    type: types.TOKEN_FETCH_SUCCEEDED_ACTION,
    payload,
});
// 在SAGA中请求失败时触发的动作

export const tokenFetchFailedAction = (payload: ILoginState) => ({
    type: types.TOKEN_FETCH_FAILED_ACTION,
    payload,
});
