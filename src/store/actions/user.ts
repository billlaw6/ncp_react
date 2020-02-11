import { UserI, ActionI, DepartmentI } from "_constants/interface";
import * as types from "../action-types";


// 需要监听：用于用户注册
export type LoginUserActionT = ActionI<string, FormData>;
export interface LoginUserActionFuncT {
  (payload: FormData): LoginUserActionT;
}
export const loginUserAction: LoginUserActionFuncT = payload => ({
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
export interface RegisterUserActionFuncT {
  (payload: FormData): RegisterUserActionT;
}
export const registerUserAction: RegisterUserActionFuncT = payload => ({
  type: types.REGISTER_USER,
  payload,
});

// 设置登录用户全局变量
export type SetUserActionT = ActionI<string, UserI>;
export interface SetUserActionFuncT {
  (payload: UserI): SetUserActionT;
}
export const setUserAction: SetUserActionFuncT = payload => ({
  type: types.SET_USER,
  payload,
});

// 需要监听：用于用户信息更新
export type UpdateUserActionT = ActionI<string, FormData>;
export interface UpdateUserActionFuncT {
  (payload: FormData): UpdateUserActionT;
}
export const updateUserAction: UpdateUserActionFuncT = payload => ({
  type: types.UPDATE_USER,
  payload,
});

// 用户注销时操作：发起远程注销，清楚本地变量
export type LogoutUserActionT = ActionI<string, void>;
export interface LogoutUserActionFuncT {
  (payload: void): LogoutUserActionT;
}
export const logoutUserAction: LogoutUserActionFuncT = payload => ({
  type: types.LOGOUT_USER,
  payload,
});

interface SearchFormI {
  keyword: string;
}
export type GetDepartmentListActionT = ActionI<string, SearchFormI>;
export interface GetDepartmentListActionFuncT {
  (payload: SearchFormI): GetDepartmentListActionT;
}
export const getDepartmentListAction: GetDepartmentListActionFuncT = payload => ({
  type: types.GET_DEPARTMENT_LIST,
  payload,
});

export type SetDepartmentListActionT = ActionI<string, DepartmentI[]>;
export interface SetDepartmentListActionFuncT {
  (payload: DepartmentI[]): SetDepartmentListActionT;
}
export const setDepartmentListAction: SetDepartmentListActionFuncT = payload => ({
  type: types.SET_DEPARTMENT_LIST,
  payload,
});