import { UserI, DepartmentI } from "_constants/interface";
import { UpdateUserActionFuncT } from "_actions/user";

export interface MapStateToPropsI {
  user: UserI;
  departmentList: DepartmentI[];
}
export interface MapDispatchToPropsI {
  updateUserAction: UpdateUserActionFuncT;
}
