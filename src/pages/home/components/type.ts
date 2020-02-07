import { UserI } from "_constants/interface";

export interface MapStateToPropsI {
  router: { location: Location };
  user: UserI;
}

export interface PrivacyNoticePropsI {
  user: UserI;
  onChecked: Function;
}
