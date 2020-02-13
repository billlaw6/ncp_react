import { UserI, DepartmentI } from "_constants/interface";
import { UpdateUserActionFuncI } from "_actions/user";
import { GetCadreReportListActionFuncI } from "_actions/report";

export interface MapStateToPropsI {
  user: UserI;
  departmentList: DepartmentI[];
};

export interface MapDispatchToPropsI {
  getCadreReportList: GetCadreReportListActionFuncI;
};
