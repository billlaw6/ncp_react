import { TempReportI, UserI, CadreReportI } from "_constants/interface";
import {
  getTempReportListAction,
  checkTempReportListAction,
  getCadreReportListAction,
  checkCadreReportListAction,
} from "_actions/report";
import { RouteComponentProps } from "react-router";
import { ReactElement } from "react";

export interface MapStateToPropsI {
  tempReportList: TempReportI[];
  cadreReportList: CadreReportI[];
  user: UserI;
  token: string;
}
export interface MapDispatchToPropsI {
  getTempReportListAction: typeof getTempReportListAction;
  checkTempReportListAction: typeof checkTempReportListAction;
  getCadreReportListAction: typeof getCadreReportListAction;
  checkCadreReportListAction: typeof checkCadreReportListAction;
}

export type HomePropsI = MapStateToPropsI & MapDispatchToPropsI & RouteComponentProps;
export interface HomeStateI {
  start: string; // YYYY-MM-DD HH:MM:SS
  end: string; // YYYY-MM-DD HH:MM:SS
  keyword: string;
  selectedRowKeys: []; //当前已选择的id 集
  selectedRowKeysCadre: []; //当前已选择的id 集
  loading: false,
  redirectReport: boolean; // 是否重定向到report页
  page: number;
  feverCount: number;
  foreignCount: number;
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
