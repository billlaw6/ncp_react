import { ILoginState } from '../constants/store.d';
import { Action } from 'redux';
import {
    tokenFetchRequstedAction,
    tokenFetchSucceededAction,
    tokenFetchFailedAction,
    TOKEN_FETCH_REQUESTED_ACTION,
    TOKEN_FETCH_SUCCEEDED_ACTION,
    TOKEN_FETCH_FAILED_ACTION,
} from '../actions/token';

// 设置本组件默认值
const defaultState: ILoginState = {
    username: '',
    password: '',
    token: '',
    messages: [],
}

const tokenReducer = (
    state = defaultState,
    // action: Action,
    action: ReturnType<typeof tokenFetchSucceededAction> &
        ReturnType<typeof tokenFetchFailedAction> &
        ReturnType<typeof tokenFetchRequstedAction>,
) => {
    if (!action) return state;

    switch (action.type) {
        // 全部CASE必须返回STATE类型的数据，以替换原来的STATE。actions文件中已经指定了payload的类型。
        case TOKEN_FETCH_REQUESTED_ACTION:
            return ({
                ...state,
                ...action.payload,
            })
        case TOKEN_FETCH_SUCCEEDED_ACTION:
            // 必须得写成后一种形式，返回state同样的数据格式不管用，会报“reducer "token" returned undefined.”类错误
            // console.log(action);
            // return action.payload;
            return ({
                ...state,
                ...action.payload,
            })
        case TOKEN_FETCH_FAILED_ACTION: {
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
export default tokenReducer;
