import { UserI } from "_constants/interface";

export interface MapStateToPropsI {
  router: { location: Location };
  user: UserI;
}
