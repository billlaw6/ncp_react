import { combineReducers } from "redux";
import { History } from "history";
import { connectRouter } from "connected-react-router";
import { tokenReducer, userReducer, departmentListReducer } from "./user";
import { tempReportListReducer, cadreReportListReducer } from "./report";

// 每个reducer必须都返回state类型的数据！
const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    token: tokenReducer,
    user: userReducer,
    departmentList: departmentListReducer,
    tempReportList: tempReportListReducer,
    cadreReportList: cadreReportListReducer,
  });

export default createRootReducer;
