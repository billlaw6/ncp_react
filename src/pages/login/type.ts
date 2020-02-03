import { LoginFormI, CurrentUserI } from "_constants/interface";
import {
  SetWeChatCodeActionFuncI,
  SetLoginFormActionFuncT,
  SubmitLoginFormActionFuncT,
  SetCurrentUserActionFuncT,
} from "_actions/user";

export interface MapStateToPropsI {
  router: { location: Location };
  loginForm: LoginFormI;
  currentUser: CurrentUserI;
}

export interface MapDispatchToPropsI {
  setWeChatCodeAction: SetWeChatCodeActionFuncI;
  setLoginFormAction: SetLoginFormActionFuncT;
  submitLoginFormAction: SubmitLoginFormActionFuncT;
  setCurrentUserAction: SetCurrentUserActionFuncT;
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
