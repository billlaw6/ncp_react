import { LoginFormI, UserInfoI, CurrentUserI, ActionI } from "../../constants/interface";
import * as types from "../action-types";

export type SetWeChatCodeActionT = ActionI<string, string>;
export interface SetWeChatCodeActionFuncI {
  (payload: string): SetWeChatCodeActionT;
}
export const setWeChatCodeAction: SetWeChatCodeActionFuncI = payload => ({
  type: types.SET_WECHAT_CODE,
  payload,
});

export type SetCurrentUserActionT = ActionI<string, CurrentUserI>;
export interface SetCurrentUserActionFuncT {
  (payload: CurrentUserI): SetCurrentUserActionT;
}
export const setCurrentUserAction: SetCurrentUserActionFuncT = payload => ({
  type: types.SET_CURRENT_USER,
  payload,
});

export type SetLoginFormActionT = ActionI<string, LoginFormI>;
export interface SetLoginFormActionFuncT {
  (payload: LoginFormI): SetLoginFormActionT;
}
export const setLoginFormAction: SetLoginFormActionFuncT = payload => ({
  type: types.SET_LOGIN_FORM,
  payload,
});

export type SubmitLoginFormActionT = ActionI<string, LoginFormI>;
export interface SubmitLoginFormActionFuncT {
  (payload: LoginFormI): SubmitLoginFormActionT;
}
export const submitLoginFormAction: SubmitLoginFormActionFuncT = payload => ({
  type: types.SUBMIT_LOGIN_FORM,
  payload,
});

export type SetUserInfoActionT = ActionI<string, UserInfoI>;
export interface SetUserInfoActionFuncT {
  (payload: UserInfoI): SetUserInfoActionT;
}
export const setUserInfoAction: SetUserInfoActionFuncT = payload => ({
  type: types.SET_USER_INFO,
  payload,
});

export type SetUserListActionT = ActionI<string, UserInfoI[]>;
export interface SetUserListActionFuncT {
  (payload: UserInfoI[]): SetUserListActionT;
}
export const setUserListAction: SetUserListActionFuncT = payload => ({
  type: types.SET_USER_LIST,
  payload,
});
