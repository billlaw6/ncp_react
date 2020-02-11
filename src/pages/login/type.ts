import { UserI } from "_constants/interface";
import { LoginUserActionFuncT, GetDepartmentListActionFuncT } from "_actions/user";

export interface MapStateToPropsI {
  user: UserI;
}

export interface MapDispatchToPropsI {
  loginUserAction: LoginUserActionFuncT;
  getDepartmentList: GetDepartmentListActionFuncT;
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
