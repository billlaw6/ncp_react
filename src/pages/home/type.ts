import { TempReportI, UserI } from "_constants/interface";
import { getTempReportListAction, checkTempReportListAction } from "_actions/report";
import { RouteComponentProps } from "react-router";
import { ReactElement } from "react";

export interface MapStateToPropsI {
  tempReportList: TempReportI[];
  user: UserI;
}
export interface MapDispatchToPropsI {
  getList: typeof getTempReportListAction;
  checkList: typeof checkTempReportListAction;
}

export type HomePropsI = MapStateToPropsI & MapDispatchToPropsI & RouteComponentProps;
export interface HomeStateI {
  isSelectable: boolean; // 是否是可选择的
  page: number; // 当前在第几页 从1开始
  selectedRowKeys: []; //当前已选择的id 集
  loading: false,
  redirectReport: boolean; // 是否重定向到report页
}

export interface TableDataI {
  id: string;
  name: string;
  role: string;
  emp_code: string;
  department: string;
  is_fever: number;
  temperature: number;
  foreign_flag: number;
  from_where: string;
  created_at: Date;
  filters: any;
}
