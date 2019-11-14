import { ThunkAction } from 'redux-thunk';
import { userLogin, userLogout } from '../middleware/user';
import { ITokenState, IUserState, IUserList, IStoreState } from '../constants/store.d';

// 登录成功后更新state里的user.token
export const USER_LOGIN_ACTION_TYPE = 'user/login';
// 此处的类型会影响
export const userLoginAction = (payload: IUserState) => ({
    type: USER_LOGIN_ACTION_TYPE,
    payload,
})
export const userLoginThunk = (): ThunkAction<void, IStoreState, undefined, ReturnType<typeof userLoginAction>> =>
    async (dispatch) => {
        const formData = { username: 'liubin', password: 'liubin123456' }
        userLogin(formData).then((res) => {
            console.log(res);
            dispatch(userLoginAction(res.data.token))
        }, (err) => {
            console.log(err);
        })
    }

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
