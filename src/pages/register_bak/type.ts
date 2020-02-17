import { UserI } from "_constants/interface";
import { SetTokenActionFuncI, RegisterUserActionFuncI } from "_actions/user";

export interface MapStateToPropsI {
  user: UserI;
}
export interface MapDispatchToPropsI {
  setTokenAction: SetTokenActionFuncI;
  registerUserAction: RegisterUserActionFuncI;
}

export type RegisterPropsI = MapStateToPropsI & MapDispatchToPropsI;

export interface RegisterStateI {

}

// 本页面独有的数据类型，防止因表单增加太多全局变量
export interface RegisterErrorI {
  cell_phone: string;
  name: string;
  password1: string;
  passowrd2: string;
}