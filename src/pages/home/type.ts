import { DailyReportI, UserI, DailyReportSearchFormI } from "_constants/interface";
import {
  setDailyReportSearchAction,
  checkDailyReportListAction,
  getDailyReportListAction,
} from "_actions/report";
import { RouteComponentProps } from "react-router";
import { ReactElement } from "react";
import { Moment } from 'moment';

export interface MapStateToPropsI {
  user: UserI;
  token: string;
  dailyReportList: DailyReportI[];
  dailyReportSearchForm: DailyReportSearchFormI;
}
export interface MapDispatchToPropsI {
  getDailyReportListAction: typeof getDailyReportListAction;
  setDailyReportSearchAction: typeof setDailyReportSearchAction;
  checkDailyReportListAction: typeof checkDailyReportListAction;
}

export type HomePropsI = MapStateToPropsI & MapDispatchToPropsI & RouteComponentProps;

export interface HomeStateI {
  selectedRowKeys: []; //当前已选择的id 集
  loading: false,
  redirectReport: boolean; // 是否重定向到report页
  isDeptReporter: boolean;
  statsDailyReport: {
    branch_stats: any[];
    dept_stats: any[];
  };
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
