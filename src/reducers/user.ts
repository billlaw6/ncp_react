import { IUserState, ILoginState } from '../constants/store.d';
import { Action } from 'redux';
import {
    userLoginAction,
    USER_LOGIN_ACTION_TYPE,
    userLogoutAction,
    USER_LOGOUT_ACTION_TYPE,
} from '../actions/user';
// import { login } from '@/middleware/api';

//
const defaultState: ILoginState = {
    username: '',
    password: '',
};

type ActionType = ReturnType<typeof userLoginAction> &
    ReturnType<typeof userLogoutAction>;

const userReducer = (state = defaultState, action: ActionType) => {
    switch (action.type) {
        case USER_LOGIN_ACTION_TYPE: {
            return action.payload;
        }
        case USER_LOGOUT_ACTION_TYPE: {
            return state;
        }
        default:
            return state;
    }
};

export default userReducer;
