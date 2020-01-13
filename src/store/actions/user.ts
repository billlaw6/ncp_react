import { LoginFormI, UserInfoI, CurrentUserI } from "../../constants/interface";
import * as types from "../action-types";

export const setWeChatCodeAction = (payload: string) => ({
  type: types.SET_WECHAT_CODE,
  payload,
});

export const setCurrentUserAction = (payload: CurrentUserI) => ({
  type: types.SET_CURRENT_USER,
  payload,
});

export const setLoginFormAction = (payload: LoginFormI) => ({
  type: types.SET_LOGIN_FORM,
  payload,
});

export const submitLoginFormAction = (payload: LoginFormI) => ({
  type: types.SUBMIT_LOGIN_FORM,
  payload,
});

export const setUserInfoAction = (payload: UserInfoI) => ({
  type: types.SET_USER_INFO,
  payload,
});

export const setUserListAction = (payload: UserInfoI[]) => ({
  type: types.SET_USER_LIST,
  payload,
});
