import { ThunkAction } from 'redux-thunk';
import { ITokenState, IStoreState } from '../constants/store.d';
import { userLogin } from '../middleware/user';

// 登录成功时设置全局Token
export const SET_TOKEN_ACTION_TYPE = 'token/set';
export const setTokenAction = (payload: ITokenState) => ({
    type: SET_TOKEN_ACTION_TYPE,
    payload: payload,
});
export const setTokenThunk = (): ThunkAction<void, IStoreState, undefined, ReturnType<typeof setTokenAction>> =>
    async (dispatch) => {
        const formData = { username: 'liubin', password: 'liubin123456' }
        userLogin(formData).then((res) => {
            console.log(res.data);
            dispatch(setTokenAction(res.data))
        }, (err) => {
            console.log(err);
        })
    }
    
// 注销成功时删除全局Token
export const DEL_TOKEN_ACTION_TYPE = 'token/del';
export const delTokenAction = () => ({
    type: SET_TOKEN_ACTION_TYPE,
});