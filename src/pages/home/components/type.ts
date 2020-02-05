import { UserI } from "_constants/interface";
import { AgreePrivacyNoticeActionFuncT } from "../../../store/actions/user";

export interface MapStateToPropsI {
  router: { location: Location };
  currentUser: UserI;
}

export interface MapDispatchToPropsI {
  agreePrivacyNoticeAction: AgreePrivacyNoticeActionFuncT;
}
