import { ILoginForm, IUserInfo, ICurrentUser } from "../../constants/interface";
import * as types from "../action-types";

export const setWeChatCodeAction = (payload: string) => ({
  type: types.SET_WECHAT_CODE,
  payload,
});

export const setCurrentUserAction = (payload: ICurrentUser) => ({
  type: types.SET_CURRENT_USER,
  payload,
});

export const setLoginFormAction = (payload: ILoginForm) => ({
  type: types.SET_LOGIN_FORM,
  payload,
});

export const submitLoginFormAction = (payload: ILoginForm) => ({
  type: types.SUBMIT_LOGIN_FORM,
  payload,
});

export const setUserInfoAction = (payload: IUserInfo) => ({
  type: types.SET_USER_INFO,
  payload,
});

export const setUserListAction = (payload: IUserInfo[]) => ({
  type: types.SET_USER_LIST,
  payload,
});
