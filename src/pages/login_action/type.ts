import { UserI } from "_constants/interface";
import { LoginUserActionFuncI, SetLoginErrorActionFuncI, SetTokenActionFuncI, SetUserActionFuncI, GetDepartmentListActionFuncI } from "_actions/user";

export interface MapStateToPropsI {
  user: UserI;
  loginError: string;
}

export interface MapDispatchToPropsI {
  loginUserAction: LoginUserActionFuncI;
  setTokenAction: SetTokenActionFuncI;
  setUserAction: SetUserActionFuncI;
  getDepartmentListAction: GetDepartmentListActionFuncI;
  setLoginErrorAction: SetLoginErrorActionFuncI;
}

export type LoginPropsI = MapStateToPropsI & MapDispatchToPropsI;

export interface FieldsI {
  username: {
    value: string;
  };
  password: {
    value: string;
  };
  remember: {
    value: boolean;
  };
  messages: {
    value: Array<string>;
  };
}
