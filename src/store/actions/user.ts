import { LoginFormI, UserI, CurrentUserI, ActionI } from "../../constants/interface";
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

export type SetUserInfoActionT = ActionI<string, UserI>;
export interface SetUserInfoActionFuncT {
  (payload: UserI): SetUserInfoActionT;
}
export const setUserInfoAction: SetUserInfoActionFuncT = payload => ({
  type: types.SET_USER_INFO,
  payload,
});

export type SetUserListActionT = ActionI<string, UserI[]>;
export interface SetUserListActionFuncT {
  (payload: UserI[]): SetUserListActionT;
}
export const setUserListAction: SetUserListActionFuncT = payload => ({
  type: types.SET_USER_LIST,
  payload,
});

export type UpdateUserInfoActionT = ActionI<string, UserI>;
export interface UpdateUserInfoActionFuncT {
  (payload: UserI): UpdateUserInfoActionT;
}
export const updateUserInfoAction: UpdateUserInfoActionFuncT = payload => ({
  type: types.UPDATE_USER_INFO,
  payload,
});

export type AgreePrivacyNoticeT = ActionI<string, { privacy_notice_id: number }>;
export interface AgreePrivacyNoticeActionFuncT {
  (payload: { privacy_notice_id: number }): AgreePrivacyNoticeT;
}
export const agreePrivacyNoticeAction: AgreePrivacyNoticeActionFuncT = payload => ({
  type: types.AGREE_PRIVACY_NOTICE,
  payload,
});
