import { UserI, ActionI, DepartmentI } from "_constants/interface";
import * as types from "../action-types";


// 需要监听：用于用户注册
export type LoginUserActionT = ActionI<string, FormData>;
export interface LoginUserActionFuncI {
  (payload: FormData): LoginUserActionT;
}
export const loginUserAction: LoginUserActionFuncI = payload => ({
  type: types.LOGIN_USER,
  payload,
});

// 设置后台给的token
export type SetTokenActionT = ActionI<string, string>;
export interface SetTokenActionFuncI {
  (payload: string): SetTokenActionT;
}
export const setTokenAction: SetTokenActionFuncI = payload => ({
  type: types.SET_TOKEN,
  payload,
});

// 需要监听：用于用户注册
export type RegisterUserActionT = ActionI<string, FormData>;
export interface RegisterUserActionFuncI {
  (payload: FormData): RegisterUserActionT;
}
export const registerUserAction: RegisterUserActionFuncI = payload => ({
  type: types.REGISTER_USER,
  payload,
});

// 设置登录用户全局变量
export type SetUserActionT = ActionI<string, UserI>;
export interface SetUserActionFuncI {
  (payload: UserI): SetUserActionT;
}
export const setUserAction: SetUserActionFuncI = payload => ({
  type: types.SET_USER,
  payload,
});

// 需要监听：用于用户信息更新
export type UpdateUserActionT = ActionI<string, FormData>;
export interface UpdateUserActionFuncI {
  (payload: FormData): UpdateUserActionT;
}
export const updateUserAction: UpdateUserActionFuncI = payload => ({
  type: types.UPDATE_USER,
  payload,
});

// 用户注销时操作：发起远程注销，清楚本地变量
export type LogoutUserActionT = ActionI<string, void>;
export interface LogoutUserActionFuncI {
  (payload: void): LogoutUserActionT;
}
export const logoutUserAction: LogoutUserActionFuncI = payload => ({
  type: types.LOGOUT_USER,
  payload,
});

interface SearchFormI {
  keyword: string;
}
export type GetDepartmentListActionT = ActionI<string, SearchFormI>;
export interface GetDepartmentListActionFuncI {
  (payload: SearchFormI): GetDepartmentListActionT;
}
export const getDepartmentListAction: GetDepartmentListActionFuncI = payload => ({
  type: types.GET_DEPARTMENT_LIST,
  payload,
});

export type SetDepartmentListActionT = ActionI<string, DepartmentI[]>;
export interface SetDepartmentListActionFuncI {
  (payload: DepartmentI[]): SetDepartmentListActionT;
}
export const setDepartmentListAction: SetDepartmentListActionFuncI = payload => ({
  type: types.SET_DEPARTMENT_LIST,
  payload,
});