import { call, put, takeEvery } from "redux-saga/effects";
import { getDepartmentListAction, registerUserAction, loginUserAction, updateUserAction, logoutUserAction } from "_actions/user";
import { getTempReportListAction, checkTempReportListAction } from "_actions/report";
import { getDepartmentList, registerUser, loginUser, getUserInfo, logoutUser, updateUserInfo } from "_services/user";
import { getTempReportList, checkTempReport } from "_services/report";
import * as types from "../store/action-types";
import { push } from "connected-react-router";
// import { store } from "../index";

// worker Saga : 将在 action 被 dispatch 时调用
// 用户信息修改页发出updateUserAction
function* registerUserEffect(action: ReturnType<typeof registerUserAction>) {
  try {
    yield put({ type: types.SET_TOKEN, payload: "" });
    const res = yield call(registerUser, action.payload);
    // console.group("==== formData In Saga ====");
    // action.payload.forEach((value, key) => {
    //   console.log("Key: ", key, "  Value: ", value);
    // });
    // console.groupEnd();
    console.log(res.data);
    yield put({ type: types.SET_TOKEN, payload: res.data.token });
    yield put({ type: types.SET_USER, payload: res.data.token });
    yield put(push("/profile"));
  } catch (error) {
    console.error(error);
  }
}

function* loginUserEffect(action: ReturnType<typeof loginUserAction>) {
  try {
    yield put({ type: types.SET_TOKEN, payload: ""});
    const key_res = yield call(loginUser, action.payload);
    // console.group("==== formData In Saga ====");
    // action.payload.forEach((value, key) => {
    //   console.log("Key: ", key, "  Value: ", value);
    // });
    // console.groupEnd();
    console.log(key_res);
    yield put({ type: types.SET_TOKEN, payload: key_res.data.key});
    const user_res = yield call(getUserInfo);
    console.log(user_res);
    yield put({ type: types.SET_USER, payload: user_res.data});
    yield put(push("/temp-report"));
  } catch (error) {
    console.error(error);
  }
}

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
    yield put(push("/temp-report"));
  } catch (error) {
    console.error(error);
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

function* getDepartmentListEffect(action: ReturnType<typeof getDepartmentListAction>) {
  try {
    console.log(action.payload);
    const res = yield call(getDepartmentList, action.payload);
    // console.log(typeof JSON.parse(res.data));
    console.log(res.data);
    // put对应redux中的dispatch。
    yield put({ type: types.SET_DEPARTMENT_LIST, payload: res.data });
  } catch (error) {
    console.log(error.response);
  }
}

function* getTempReportEffect(action: ReturnType<typeof getTempReportListAction>) {
  try {
    console.log(action.payload);
    const res = yield call(getTempReportList, action.payload);
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
  yield takeEvery(types.REGISTER_USER, registerUserEffect);
  yield takeEvery(types.LOGIN_USER, loginUserEffect);
  yield takeEvery(types.UPDATE_USER, updateUserEffect);
  yield takeEvery(types.LOGOUT_USER, logoutUserEffect);
  yield takeEvery(types.GET_TEMP_REPORT_LIST, getTempReportEffect);
  yield takeEvery(types.GET_DEPARTMENT_LIST, getDepartmentListEffect);
  yield takeEvery(types.CHECK_TEMP_REPORT_LIST, checkTempReportEffect);
}

export default rootSaga;
