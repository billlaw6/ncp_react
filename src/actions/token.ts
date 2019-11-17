import { ITokenState, IStoreState } from '../constants/store.d';
import { userLogin } from '../services/user';

// 用于在SAGA中触发请求
export const TOKEN_FETCH_REQUESTED_ACTION = 'TOKEN_FETCH_REQUESTED_ACTION';
export const tokenFetchRequstedAction = () => ({
    type: TOKEN_FETCH_REQUESTED_ACTION,
});
// 在SAGA中请求成功触发的动作
export const TOKEN_FETCH_SUCCEEDED_ACTION = 'TOKEN_FETCH_SUCCEEDED_ACTION';
export const tokenFetchSucceededAction = (payload: ITokenState) => ({
    type: TOKEN_FETCH_SUCCEEDED_ACTION,
    payload: payload,
});
// 在SAGA中请求失败时触发的动作
export const TOKEN_FETCH_FAILED_ACTION = 'TOKEN_FETCH_FAILED_ACTION';
export const tokenFetchFailedAction = (payload='') => ({
    type: TOKEN_FETCH_FAILED_ACTION,
    payload: payload,
});
