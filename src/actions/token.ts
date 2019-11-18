import { ILoginState, IStoreState } from '../constants/store.d';

// 用于在SAGA中触发请求
export const TOKEN_FETCH_REQUESTED_ACTION = 'TOKEN_FETCH_REQUESTED_ACTION';
export const tokenFetchRequstedAction = (payload: ILoginState) => ({
    type: TOKEN_FETCH_REQUESTED_ACTION,
    payload,
});
// 在SAGA中请求成功触发的动作
export const TOKEN_FETCH_SUCCEEDED_ACTION = 'TOKEN_FETCH_SUCCEEDED_ACTION';
export const tokenFetchSucceededAction = (payload: ILoginState) => ({
    type: TOKEN_FETCH_SUCCEEDED_ACTION,
    payload,
});
// 在SAGA中请求失败时触发的动作
export const TOKEN_FETCH_FAILED_ACTION = 'TOKEN_FETCH_FAILED_ACTION';
export const tokenFetchFailedAction = (payload: ILoginState) => ({
    type: TOKEN_FETCH_FAILED_ACTION,
    payload,
});
