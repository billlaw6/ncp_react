import { userLogin, userLogout } from '../services/user';
import { IUserState, IUserList } from '../constants/store.d';

// 登录成功后更新state里的user.token
export const USER_LOGIN_ACTION_TYPE = 'user/login';
export const userLoginAction = (payload: IUserState) => ({
    type: USER_LOGIN_ACTION_TYPE,
    payload,
})

export const USER_LOGOUT_ACTION_TYPE = 'user/logout';
export const userLogoutAction = () => ({
    type: USER_LOGOUT_ACTION_TYPE,
});

export const FETCH_USER_ACTION_TYPE = 'user/list';
export const fetchUserListAction = () => ({
    type: FETCH_USER_ACTION_TYPE,
});

export const FETCH_USER_LIST_SUCCESS_TYPE = 'userList/success'
export const fetchUserListSuccess = (payload: IUserList) => ({
    type: FETCH_USER_LIST_SUCCESS_TYPE,
    payload,
})
