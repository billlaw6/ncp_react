import { ThunkAction } from 'redux-thunk';
import { IUserState, IUserList, ILoginState, IStoreState } from '../constants/store.d';

export const USER_LOGIN_ACTION_TYPE = 'user/login';
export const userLoginAction = (payload: ILoginState) => ({
    type: USER_LOGIN_ACTION_TYPE,
    payload,
});

export const USER_LOGOUT_ACTION_TYPE = 'user/logout';
export const userLogoutAction = () => ({
    type: USER_LOGOUT_ACTION_TYPE,
});

export const FETCH_USER_ACTION_TYPE = 'user/list';
export const fetchUserListAction = () => ({
    type: FETCH_USER_ACTION_TYPE,
});

export const fetchUserList = (): ThunkAction<void, IStoreState, undefined, ReturnType<typeof fetchUserListAction>> =>
    async (dispatch) => {
        const response = await fetch('http://123.56.115.20:8083/rest-api/user/', {})
        const data = await response.json()
        dispatch(fetchUserListSuccess(data))
    }

export const FETCH_USER_LIST_SUCCESS_TYPE = 'userList/success'
export const fetchUserListSuccess = (payload: IUserList) => ({
    type: FETCH_USER_LIST_SUCCESS_TYPE,
    payload,
})
