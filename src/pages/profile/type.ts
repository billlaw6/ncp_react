import { UserI, DepartmentI } from "_constants/interface";
import { UpdateUserActionFuncI, GetDepartmentListActionFuncI } from "_actions/user";

export interface MapStateToPropsI {
  user: UserI;
  departmentList: DepartmentI[];
}
export interface MapDispatchToPropsI {
  getDepartmentList: GetDepartmentListActionFuncI;
  updateUser: UpdateUserActionFuncI;
}
