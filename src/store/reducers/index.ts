import { combineReducers } from "redux";
import { History } from "history";
import { connectRouter } from "connected-react-router";
import { tokenReducer, userReducer } from "./user";
import { tempReportListReducer } from "./report";

// 每个reducer必须都返回state类型的数据！
const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    token: tokenReducer,
    user: userReducer,
    tempReportList: tempReportListReducer,
  });

export default createRootReducer;
