import { InputHTMLAttributes, DOMAttributes } from "react";
import { Moment } from "moment";

// Store相关接口
// 本地变量遵循js规范使用驼峰式全名，需要与后台数据库字段对应的变量使用下划线风格。
/* ===============  根据Tower文档整理的接口相关的interface =============== */
// 性别枚举
export declare enum GenderE {
  UNKNOW = 0,
  MALE = 1,
  FEMALE = 2,
}

export interface WorkStatusI {
  code: string;
  name: string;
  cadre_flag: number;
  pinyin: string;
  py: string;
}

export interface DutyI {
  code: string;
  name: string;
  cadre_flag: number;
  pinyin: string;
  py: string;
}

// 用户信息
export declare interface UserI {
  id: number;
  emp_code: string;
  name: string;
  role: RoleE;
  department: string;
  work_department?: string;
  work_department_name?: string;
  work_status?: string;
  work_status_name?: string;
  cell_phone: string;
  gender: GenderE;
  birthday?: string;
  age: number;
  address: string;
  // duty?: DutyI;  当一个User对多个Duty时适合使用NestedSerializer
  duty?: string;
  title?: string;
  unit?: string;
  groups: number[]; // 这里的问号会影响页面是groups为空的提示
  pinyin?: "";
  py?: "";
}

// 科室字典
// 干部报告
export declare interface CadreReportI {
  id: string;
  name: string;
  emp_code: string;
  department: string;
  on_duty_flag: number;
  reason: string;
  created_at: Date;
}

// 体温报告
export declare interface TempReportI {
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
}

// 每日报告
export declare interface DailyReportI {
  id: string;
  department: string;
  duty: string;
  role: string;
  emp_code: string;
  name: string;
  gender: number;
  cadre_flag: string;
  work_status: string;
  work_department: string;
  work_status_name: string;
  work_department_name: string;
  is_fever: number;
  temperature: number;
  foreign_flag: number;
  at_where: string;
  comments: string;
  created_at: Date;
}

export interface DailyReportSearchFormI {
  // dtRange: [Moment, Moment]; // Moment的在页面间传输时会被转成String，可能和persist-redux有关系。
  start: string; // YYYY-mm-dd HH:MM:SS
  end: string; // YYYY-mm-dd HH:MM:SS
  keyword: string;
}

export type DailyReportStatsT = [string, string, string, string, number, number]

export interface RoleI {
  code: string;
  name: string;
  pinyin?: string;
  py?: string;
}

export declare interface DepartmentI {
  code: string;
  name: string;
  pinyin: string;
  py: string;
  is_active: boolean;
  created_at: Date;
  staff: UserI[];
}

/* ===============  根据Tower文档整理的接口相关的interface END =============== */

export declare interface RouteI {
  path: string;
  name: string;
  exact: boolean;
  component: React.Component;
  routes?: RouteI[];
  permission?: string[];
}

// 创建store时要遵循的rootState接口，不能使用rootReducers的类型
// 作为组件创建时props类型！！！必须用store.d里定义的！三天的教训！
// 全局共享变量设置
export declare interface StoreStateI {
  router: { location: Location };
  token: string;
  user: UserI;
  // 登录错误
  loginError: string;
  // 科室字典 多页面共用字典
  departmentList: DepartmentI[];

  // 报告
  tempReportList: TempReportI[];
  cadreReportList: CadreReportI[];
  // 日报当前检索条件
  dailyReportSearchForm: DailyReportSearchFormI;
  dailyReportList: DailyReportI[];
  dailyReportStats: DailyReportStatsT[];
}

export declare interface CustomHTMLDivElement extends HTMLDivElement {
  webkitRequestFullscreen: () => void;
  msRequestFullscreen: () => void;
  mozRequestFullScreen: () => void;
}

interface Document {
  exitFullscreen: any;
  webkitExitFullscreen: any;
  mozCancelFullScreen: any;
  msExitFullscreen: any;
}

export declare interface Document {
  exitFullscreen: () => void;
  webkitExitFullscreen: () => void;
  mozCancelFullScreen: () => void;
  msExitFullscreen: () => void;
}

export declare interface ActionI<T, K> {
  type: T;
  payload: K;
}
