import { IUserState } from '../../constants/store';
import { Action } from 'redux';
import {
    userLoginAction,
    userLogoutAction,
} from '../actions/user';
import * as types from '../action-types';
import { isDebuggerStatement } from '@babel/types';

// type IState = ITokenState & IUserState;
const defaultState: IUserState = {
    id: -1,
    username: '',
    email: '',
    cell_phone: '',
    openid: '',
    unionid: '',
    groups: [],
    first_name: '',
    last_name: '',
    pinyin: '',
    py: '',
    sex: 0,
    user_permissions: [],
};

type ActionType = ReturnType<typeof userLoginAction> &
    ReturnType<typeof userLogoutAction>;

const userReducer = (state = defaultState, action: ActionType) => {
    switch (action.type) {
        case types.USER_LOGIN_ACTION_TYPE: {
            return action.payload;
        }
        case types.USER_LOGOUT_ACTION_TYPE: {
            return state;
        }
        default:
            return state;
    }
};

export default userReducer;