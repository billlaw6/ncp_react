import { InputHTMLAttributes, DOMAttributes } from "react";

// Store相关接口
// 本地变量遵循js规范使用驼峰式全名，需要与后台数据库字段对应的变量使用下划线风格。
/* ===============  根据Tower文档整理的接口相关的interface =============== */
// 性别枚举
export declare enum GenderE {
  UNKNOW = 0,
  MALE = 1,
  FEMALE = 2,
}

// 人员类别枚举
export declare enum RoleE {
  在职职工 = 0,
  外包公司 = 1,
  医辅人员 = 2,
  学生 = 3,
}

// 职务枚举
export declare enum DutiesE {
  干部 = 0,
  职员 = 1,
  上报员 = 2,
}

// 用户信息
export declare interface UserI {
  id: number;
  emp_code: string;
  name: string;
  role: RoleE;
  department: string;
  duties: DutiesE,
  cell_phone: string;
  gender: GenderE;
  birthday?: string;
  age: number;
  address: string;
  unit?: string;
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
export declare interface StoreStateI {
  router: { location: Location };
  token: string;
  user: UserI;
  tempReportList: TempReportI[];
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
