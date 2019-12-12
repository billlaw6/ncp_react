import { userLogin, userLogout } from '../../services/user';
import { IUserState, IUserList } from '../../constants';
import * as types from '../action-types';

// 登录成功后更新state里的user.token

export const userLoginAction = (payload: IUserState) => ({
    type: types.USER_LOGIN_ACTION_TYPE,
    payload,
})

export const userLogoutAction = () => ({
    type: types.USER_LOGOUT_ACTION_TYPE,
});

export const fetchUserListAction = () => ({
    type: types.FETCH_USER_ACTION_TYPE,
});

export const fetchUserListSuccess = (payload: IUserList) => ({
    type: types.FETCH_USER_LIST_SUCCESS_TYPE,
    payload,
})
