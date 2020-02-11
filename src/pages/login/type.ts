import { UserI } from "_constants/interface";
import { SetUserActionFuncT } from "_actions/user";

export interface MapStateToPropsI {
  user: UserI;
}

export interface MapDispatchToPropsI {
  setUserAction: SetUserActionFuncT;
}

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
