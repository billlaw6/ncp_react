import { UserI, RoleI, DepartmentI, DailyReportSearchFormI } from "_constants/interface";
import { UpdateUserActionFuncI, GetDepartmentListActionFuncI } from "_actions/user";
import { RouteComponentProps } from "react-router";

export interface MapStateToPropsI {
  user: UserI;
  departmentList: DepartmentI[];
  // roleList不作为全局变量
  // roleList: RoleI[];
  dailyReportSearchForm: DailyReportSearchFormI;
}

export interface MapDispatchToPropsI {
  updateUserAction: UpdateUserActionFuncI;
}

export type ProfilePropsI = MapStateToPropsI & MapDispatchToPropsI & RouteComponentProps;

export interface ProfileStateI {
}