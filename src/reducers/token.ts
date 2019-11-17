import { ITokenState } from '../constants/store.d';
import {
    tokenFetchRequstedAction,
    tokenFetchSucceededAction,
    tokenFetchFailedAction,
    TOKEN_FETCH_REQUESTED_ACTION,
    TOKEN_FETCH_SUCCEEDED_ACTION,
    TOKEN_FETCH_FAILED_ACTION,
} from '../actions/token';

// 设置本组件默认值
const defaultState: ITokenState = '';

const tokenReducer = (
    state = defaultState,
    action: ReturnType<typeof tokenFetchSucceededAction> &
        ReturnType<typeof tokenFetchFailedAction> &
        ReturnType<typeof tokenFetchRequstedAction>,
) => {
    if (!action) return state;

    switch (action.type) {
        // 全部CASE必须返回STATE类型的数据，以替换原来的STATE。actions文件中已经指定了payload的类型。
        case TOKEN_FETCH_REQUESTED_ACTION: {
            return action.payload;
        }
        case TOKEN_FETCH_SUCCEEDED_ACTION: {
            return action.payload;
        }
        case TOKEN_FETCH_FAILED_ACTION: {
            return action.payload;
        }
        default: {
            return state;
        }
    }
};
export default tokenReducer;
