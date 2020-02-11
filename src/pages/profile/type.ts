import { UserI, DepartmentI } from "_constants/interface";
import { UpdateUserActionFuncT, GetDepartmentListActionFuncT } from "_actions/user";

export interface MapStateToPropsI {
  user: UserI;
  departmentList: DepartmentI[];
}
export interface MapDispatchToPropsI {
  getDepartmentList: GetDepartmentListActionFuncT;
  updateUser: UpdateUserActionFuncT;
}
