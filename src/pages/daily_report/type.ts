import {
  UserI,
  DepartmentI,
  DailyReportSearchFormI,
  WorkStatusI,
  DailyReportI,
} from "_constants/interface";
import { UpdateUserActionFuncI } from "_actions/user";
import { GetDailyReportListActionFuncI } from "_actions/report";

export interface MapStateToPropsI {
  user: UserI;
  departmentList: DepartmentI[];
  dailyReportSearchForm: DailyReportSearchFormI;
}

export interface MapDispatchToPropsI {
  getDailyReportListAction: GetDailyReportListActionFuncI;
}

export type DailyReportPropsI = MapStateToPropsI & MapDispatchToPropsI;

export interface DailyReportStateI {
  workStatus: string;
  isFever: boolean;
  foreignFlag: boolean;
  workStatusList: WorkStatusI[];
  workDepartmentList: string[];
}

export interface DailyReportFormErrors {
  non_fields_errors: string[];
}
