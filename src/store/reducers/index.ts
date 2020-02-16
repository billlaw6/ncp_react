import { combineReducers } from "redux";
import { History } from "history";
import { connectRouter } from "connected-react-router";
import { tokenReducer, userReducer, departmentListReducer, loginErrorReducer } from "./user";
import { tempReportListReducer, cadreReportListReducer, dailyReportListReducer, dailyReportSearchFormReducer } from "./report";

// 每个reducer必须都返回state类型的数据！
const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    token: tokenReducer,
    user: userReducer,
    departmentList: departmentListReducer,
    // tempReportList: tempReportListReducer,
    // cadreReportList: cadreReportListReducer,
    dailyReportSearchForm: dailyReportSearchFormReducer,
    dailyReportList: dailyReportListReducer,
    loginError: loginErrorReducer,
  });

export default createRootReducer;
