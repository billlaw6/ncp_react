import { ITokenState, IStoreState } from '../constants/store.d';
import { userLogin } from '../middleware/user';

// 登录成功时设置全局Token
export const SET_TOKEN_ACTION_TYPE = 'token/set';
export const setTokenAction = (payload: ITokenState) => ({
    type: SET_TOKEN_ACTION_TYPE,
    payload: payload,
});

// 注销成功时删除全局Token
export const DEL_TOKEN_ACTION_TYPE = 'token/del';
export const delTokenAction = () => ({
    type: SET_TOKEN_ACTION_TYPE,
});
