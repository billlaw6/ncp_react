import { call, put, takeEvery } from "redux-saga/effects";
import { updateUserAction, logoutUserAction } from "_actions/user";
import { getTempReportListAction, checkTempReportListAction } from "_actions/report";
import { logoutUser, updateUserInfo } from "_services/user";
import { getTempReport, checkTempReport } from "_services/report";
import * as types from "../store/action-types";
import { push } from "connected-react-router";
// import { store } from "../index";

// worker Saga : 将在 action 被 dispatch 时调用
// 用户信息修改页发出updateUserAction
function* updateUserEffect(action: ReturnType<typeof updateUserAction>) {
  try {
    const res = yield call(updateUserInfo, action.payload);
    // console.group("==== formData In Saga ====");
    // action.payload.forEach((value, key) => {
    //   console.log("Key: ", key, "  Value: ", value);
    // });
    // console.groupEnd();
    console.log(res.data);
    yield put({ type: types.SET_USER, payload: res.data });
  } catch (error) {
    console.error(error);
    yield put(push("/profile"));
  }
}

function* logoutUserEffect(action: ReturnType<typeof logoutUserAction>) {
  try {
    const res = yield call(logoutUser);
    yield put({ type: types.SET_TEMP_REPORT_LIST, payload: [] });
    yield put({ type: types.SET_TOKEN, payload: "" });
    yield put({ type: types.SET_USER, payload: {} });
    yield put(push("/login"));
  } catch (error) {
    console.error(error);
  }
}

function* getTempReportEffect(action: ReturnType<typeof getTempReportListAction>) {
  try {
    console.log(action.payload);
    const res = yield call(getTempReport);
    // console.log(typeof JSON.parse(res.data));
    console.log(res.data);
    // put对应redux中的dispatch。
    yield put({ type: types.SET_TEMP_REPORT_LIST, payload: res.data });
  } catch (error) {
    console.log(error.response);
  }
}

function* checkTempReportEffect(action: ReturnType<typeof checkTempReportListAction>) {
  try {
    const res = yield call(checkTempReport, action.payload);
    // 删除操作后用默认条件再获取一次结果，页面中暂未设定查询条件
    const defaultTempReportSearchForm = {};
    yield put({ type: types.GET_TEMP_REPORT_LIST, payload: defaultTempReportSearchForm });
  } catch (error) {
    console.log(error.response);
  }
}


function* rootSaga() {
  yield takeEvery(types.UPDATE_USER, updateUserEffect);
  yield takeEvery(types.LOGOUT_USER, logoutUserEffect);
  yield takeEvery(types.GET_TEMP_REPORT_LIST, getTempReportEffect);
  yield takeEvery(types.CHECK_TEMP_REPORT_LIST, checkTempReportEffect);
}

export default rootSaga;
