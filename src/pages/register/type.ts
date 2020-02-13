import { UserI } from "_constants/interface";
import { RegisterUserActionFuncI } from "_actions/user";

export interface MapStateToPropsI {
  user: UserI;
}
export interface MapDispatchToPropsI {
  registerUserAction: RegisterUserActionFuncI;
}
