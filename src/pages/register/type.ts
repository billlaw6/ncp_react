import { UserI } from "_constants/interface";
import { SetUserActionFuncI, SetTokenActionFuncI, RegisterUserActionFuncI } from "_actions/user";

export interface MapStateToPropsI {
  user: UserI;
}
export interface MapDispatchToPropsI {
  setTokenAction: SetTokenActionFuncI;
  registerUserAction: RegisterUserActionFuncI;
  setUserAction: SetUserActionFuncI;
}

export type RegisterPropsI = MapStateToPropsI & MapDispatchToPropsI;

export interface RegisterStateI {
  password1: string; // 用于password2校验
  registerErrors: RegisterErrorI;
}

// 本页面独有的数据类型，防止因表单增加太多全局变量
export interface RegisterErrorI {
  cell_phone: string[];
  name: string[];
  password1: string[];
  password2: string[];
}
