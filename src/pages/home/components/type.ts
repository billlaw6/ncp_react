import { UserI } from "_constants/interface";
import { GetTempReportListActionFuncI } from "_actions/report";

export interface MapStateToPropsI {
  user: UserI;
}

export interface MapDispatchToPropsI {
  getTempReportList: GetTempReportListActionFuncI;
}

export interface PrivacyNoticePropsI {
  user: UserI;
  onChecked: Function;
}
