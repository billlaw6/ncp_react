import { UserI, DepartmentI, DailyReportSearchFormI, WorkStatusI, DailyReportI } from "_constants/interface";
import { UpdateUserActionFuncI } from "_actions/user";
import { GetDailyReportListActionFuncI } from "_actions/report";

export interface MapStateToPropsI {
  user: UserI;
  departmentList: DepartmentI[];
  dailyReportSearchForm: DailyReportSearchFormI;
};

export interface MapDispatchToPropsI {
  getDailyReportListAction: GetDailyReportListActionFuncI;
};

export type DailyReportPropsI = MapStateToPropsI & MapDispatchToPropsI;

export interface DailyReportStateI {
  showTemperature: boolean,
  showFromWhere: boolean,
  workStatusList: WorkStatusI[],
  workDepartmentList: string[],
}