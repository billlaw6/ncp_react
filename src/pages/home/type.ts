import { ExamIndexListI } from "_constants/interface";
import { submitExamIndexSearchAction } from "_actions/dicom";
import { RouteComponentProps } from "react-router";

export interface MapStateToPropsI {
  examIndexList: ExamIndexListI[];
}
export interface MapDispatchToPropsI {
  getList: typeof submitExamIndexSearchAction;
}

export type HomePropsI = MapStateToPropsI & MapDispatchToPropsI & RouteComponentProps;
export interface HomeStateI {
  viewType: ViewTypeEnum; // 视图模式
  sortType: SortTypeEnum; // 排序规则
  isSelectable: boolean; // 是否是可选择的
  page: number; // 当前在第几页 从1开始
  selections: string[]; //当前已选择的dicom id 集
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
