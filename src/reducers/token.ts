import { ITokenState } from '../constants/store.d';
import {
    setTokenAction,
    SET_TOKEN_ACTION_TYPE,
    delTokenAction,
    DEL_TOKEN_ACTION_TYPE
} from '../actions/token';

// 设置本组件默认值
const defaultState: ITokenState = '';

const tokenReducer = (
    state = defaultState,
    action: ReturnType<typeof setTokenAction> & ReturnType<typeof delTokenAction>,
) => {
    if (!action) return state;

    switch (action.type) {
        case SET_TOKEN_ACTION_TYPE: {
            return action.payload;
            // return ({
            //     ...state,
            //     action.payload,
            // })
        }
        case DEL_TOKEN_ACTION_TYPE: {
            return '';
        }
        default: {
            return state;
        }
    }
};
export default tokenReducer;
