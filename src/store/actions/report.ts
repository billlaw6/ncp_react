import {
  ActionI,
  TempReportI,
  CadreReportI,
  DailyReportI,
  DailyReportSearchFormI,
  DailyReportStatsT,
} from "_constants/interface";
import * as types from "../action-types";

//////////////////////////////////////////////////////////////////////////
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

export type SetTempReportListActionT = ActionI<string, TempReportI[]>;
export interface SetTempReportListActionFuncI {
  (payload: TempReportI[]): SetTempReportListActionT;
}
export const setTempReportListAction: SetTempReportListActionFuncI = payload => ({
  type: types.SET_TEMP_REPORT_LIST,
  payload,
});

//////////////////////////////////////////////////////////////////////////
export type GetCadreReportListActionT = ActionI<string, SearchFormI>;
export interface GetCadreReportListActionFuncI {
  (payload: SearchFormI): GetCadreReportListActionT;
}
export const getCadreReportListAction: GetCadreReportListActionFuncI = payload => ({
  type: types.GET_CADRE_REPORT_LIST,
  payload,
});

// 用于saga监听，发起远程删除请求，更新本地数据
export type CheckCadreReportListActionT = ActionI<string, string[]>;
export interface CheckCadreReportListActionFuncI {
  (payload: string[]): CheckCadreReportListActionT;
}
export const checkCadreReportListAction: CheckCadreReportListActionFuncI = payload => ({
  type: types.CHECK_CADRE_REPORT_LIST,
  payload,
});

export type SetCadreReportListActionT = ActionI<string, CadreReportI[]>;
export interface SetCadreReportListActionFuncI {
  (payload: CadreReportI[]): SetCadreReportListActionT;
}
export const setCadreReportListAction: SetCadreReportListActionFuncI = payload => ({
  type: types.SET_CADRE_REPORT_LIST,
  payload,
});

//////////////////////////////////////////////////////////////////////////
export type setDailyReportSearchFormActionT = ActionI<string, DailyReportSearchFormI>;
export interface SetDailyReportSearchFormActionFuncI {
  (payload: DailyReportSearchFormI): GetDailyReportListActionT;
}
export const setDailyReportSearchAction: SetDailyReportSearchFormActionFuncI = payload => ({
  type: types.SET_DAILY_REPORT_SEARCH_FORM,
  payload,
});

export type GetDailyReportListActionT = ActionI<string, DailyReportSearchFormI>;
export interface GetDailyReportListActionFuncI {
  (payload: DailyReportSearchFormI): GetDailyReportListActionT;
}
export const getDailyReportListAction: GetDailyReportListActionFuncI = payload => ({
  type: types.GET_DAILY_REPORT_LIST,
  payload,
});

// 用于saga监听，发起远程删除请求，更新本地数据
export type CheckDailyReportListActionT = ActionI<string, string[]>;
export interface CheckDailyReportListActionFuncI {
  (payload: string[]): CheckDailyReportListActionT;
}
export const checkDailyReportListAction: CheckDailyReportListActionFuncI = payload => ({
  type: types.CHECK_DAILY_REPORT_LIST,
  payload,
});

export type SetDailyReportListActionT = ActionI<string, DailyReportI[]>;
export interface SetDailyReportListActionFuncI {
  (payload: DailyReportI[]): SetDailyReportListActionT;
}
export const setDailyReportListAction: SetDailyReportListActionFuncI = payload => ({
  type: types.SET_DAILY_REPORT_LIST,
  payload,
});

export type SetDailyReportStatsActionT = ActionI<string, DailyReportStatsT[]>;
export interface SetDailyReportStatsActionFuncI {
  (payload: DailyReportStatsT[]): SetDailyReportStatsActionT;
}
export const setDailyReportStatsAction: SetDailyReportStatsActionFuncI = payload => ({
  type: types.SET_DAILY_REPORT_STATS,
  payload,
});