import { UserI } from "_constants/interface";
import { LoginUserActionFuncI, GetDepartmentListActionFuncI } from "_actions/user";

export interface MapStateToPropsI {
  user: UserI;
}

export interface MapDispatchToPropsI {
  loginUserAction: LoginUserActionFuncI;
  getDepartmentList: GetDepartmentListActionFuncI;
}

export type LoginPropsI = MapDispatchToPropsI;

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
