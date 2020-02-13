import { ActionI, TempReportI } from "_constants/interface";
import * as types from "../action-types";

// 用于在SAGA中触发请求
interface SearchFormI {
  keyword: string;
  start: string; // YYYY-mm-dd HH:MM:SS
  end: string; // YYYY-mm-dd HH:MM:SS
}

export type GetTempReportListActionT = ActionI<string, SearchFormI>;
export interface GetTempReportListActionFuncI {
  (payload: SearchFormI): GetTempReportListActionT;
}
export const getTempReportListAction: GetTempReportListActionFuncI = payload => ({
  type: types.GET_TEMP_REPORT_LIST,
  payload,
});

// 用于saga监听，发起远程删除请求，更新本地数据
export type CheckTempReportListActionT = ActionI<string, string[]>;
export interface CheckTempReportListActionFuncI {
  (payload: string[]): CheckTempReportListActionT;
}
export const checkTempReportListAction: CheckTempReportListActionFuncI = payload => ({
  type: types.CHECK_TEMP_REPORT_LIST,
  payload,
});

// 设置本地影像列表全局变量
export type SetTempReportListActionT = ActionI<string, TempReportI[]>;
export interface SetTempReportListActionFuncI {
  (payload: TempReportI[]): SetTempReportListActionT;
}
export const setTempReportListAction: SetTempReportListActionFuncI = payload => ({
  type: types.SET_TEMP_REPORT_LIST,
  payload,
});
