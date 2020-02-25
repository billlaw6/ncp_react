import { UserI, DailyReportSearchFormI, DailyReportStatsT } from "_constants/interface";
import {
  SetDailyReportSearchFormActionFuncI,
  GetDailyReportListActionFuncI,
} from "_actions/report";

export interface MapStateToPropsI {
  user: UserI;
  dailyReportSearchForm: DailyReportSearchFormI;
  dailyReportStats: DailyReportStatsT[];
}

export interface MapDispatchToPropsI {
  // setDailyReportSearch: SetDailyReportSearchFormActionFuncI,
  // getDailyReportList: GetDailyReportListActionFuncI;
}

export type SearchFormPropsI = MapStateToPropsI & MapDispatchToPropsI;

/////////////////////
