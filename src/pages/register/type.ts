import { UserI } from "_constants/interface";
import { RegisterUserActionFuncT } from "_actions/user";

export interface MapStateToPropsI {
  user: UserI;
}
export interface MapDispatchToPropsI {
  registerUserAction: RegisterUserActionFuncT;
}
