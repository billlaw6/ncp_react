import { ExamIndexListI } from "_constants/interface";
import { submitExamIndexSearchAction } from "_actions/dicom";

export interface MapStateToPropsI {
  examIndexList: ExamIndexListI[];
}
export interface MapDispatchToPropsI {
  getList: typeof submitExamIndexSearchAction;
}

export type HomePropsI = MapStateToPropsI & MapDispatchToPropsI;
export interface HomeStateI {
  viewType: ViewTypeEnum; // 视图模式
  sortType: SortTypeEnum; // 排序规则
  isSelectable: boolean; // 是否是可选择的
}

// 排序类型
export enum SortTypeEnum {
  TIME = "time",
  TYPE = "type",
}

// 视图类型
export enum ViewTypeEnum {
  GRID = "grid",
  LIST = "list",
}
