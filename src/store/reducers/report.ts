import { TempReportI, CadreReportI } from "_constants/interface";
import * as types from "../action-types";
import { setTempReportListAction, setCadreReportListAction } from "_actions/report";

// 全局变量tempReportList
const defaultTempReportList: TempReportI[] = [];
const tempReportListReducer = (
  state = defaultTempReportList,
  action: ReturnType<typeof setTempReportListAction>,
): TempReportI[] => {
  if (!action) return state;
  switch (action.type) {
    // 全部CASE必须返回STATE类型的数据，以替换原来的STATE。actions文件中已经指定了payload的类型。
    case types.SET_TEMP_REPORT_LIST:
      return action.payload;
    default: {
      return state;
    }
  }
};

const defaultCadreReportList: CadreReportI[] = [];
const cadreReportListReducer = (
  state = defaultCadreReportList,
  action: ReturnType<typeof setCadreReportListAction>,
): CadreReportI[] => {
  if (!action) return state;
  switch (action.type) {
    // 全部CASE必须返回STATE类型的数据，以替换原来的STATE。actions文件中已经指定了payload的类型。
    case types.SET_CADRE_REPORT_LIST:
      return action.payload;
    default: {
      return state;
    }
  }
};

export { cadreReportListReducer, tempReportListReducer };