import { call, put, takeEvery } from "redux-saga/effects";
import {
  getDepartmentListAction,
  registerUserAction,
  loginUserAction,
  updateUserAction,
  logoutUserAction,
} from "_actions/user";
import {
  getDailyReportListAction,
  checkDailyReportListAction,
  getCadreReportListAction,
  checkCadreReportListAction,
} from "_actions/report";
import {
  getDepartmentList,
  registerUser,
  loginUser,
  getUserInfo,
  logoutUser,
  updateUserInfo,
} from "_services/user";
import {
  getDailyReportList,
  checkDailyReport,
  getCadreReportList,
  checkCadreReport,
} from "_services/report";
import * as types from "../store/action-types";
import { push } from "connected-react-router";
import { store } from "../index";

// worker Saga : 将在 action 被 dispatch 时调用
// 用户信息修改页发出updateUserAction
function* registerUserEffect(action: ReturnType<typeof registerUserAction>) {
  try {
    yield put({ type: types.SET_TOKEN, payload: "" });
    const res = yield call(registerUser, action.payload);
    yield put({ type: types.SET_TOKEN, payload: res.data.token });
    yield put({ type: types.SET_USER, payload: res.data.token });
    yield put(push("/profile"));
  } catch (error) {
    console.error(error);
  }
}

function* loginUserEffect(action: ReturnType<typeof loginUserAction>) {
  try {
    yield put({ type: types.SET_TOKEN, payload: "" });
    const key_res = yield call(loginUser, action.payload);
    console.log(key_res);
    if (!key_res) {
      yield put({ type: types.SET_LOGIN_ERROR, payload: "用户名或密码错误" });
    }
    yield put({ type: types.SET_TOKEN, payload: key_res.data.key });
    const user_res = yield call(getUserInfo);
    yield put({ type: types.SET_USER, payload: user_res.data });
    if (user_res.data.name === "") {
      yield put(push("/profile"));
    } else {
      yield put(push("/daily-report"));
    }
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
    // console.log(res.data);
    yield put({ type: types.SET_USER, payload: res.data });
    yield put(push("/daily-report"));
  } catch (error) {
    console.error(error);
  }
}

function* logoutUserEffect(action: ReturnType<typeof logoutUserAction>) {
  try {
    const res = yield call(logoutUser);
    yield put({ type: types.SET_DAILY_REPORT_LIST, payload: [] });
    yield put({ type: types.SET_DEPARTMENT_LIST, payload: [] });
    yield put({ type: types.SET_TOKEN, payload: "" });
    yield put({ type: types.SET_USER, payload: {} });
    yield put({ type: types.SET_LOGIN_ERROR, payload: "" });
    yield put({ type: types.SET_DAILY_REPORT_SEARCH_FORM, payload: {} });
    yield put(push("/login"));
  } catch (error) {
    console.error(error);
  }
}

function* getDepartmentListEffect(action: ReturnType<typeof getDepartmentListAction>) {
  try {
    // console.log(action.payload);
    const res = yield call(getDepartmentList, action.payload);
    // console.log(typeof JSON.parse(res.data));
    // console.log(res.data);
    // put对应redux中的dispatch。
    yield put({ type: types.SET_DEPARTMENT_LIST, payload: res.data });
  } catch (error) {
    console.log(error.response);
  }
}

function* getDailyReportEffect(action: ReturnType<typeof getDailyReportListAction>) {
  try {
    // console.log(action.payload);
    const res = yield call(getDailyReportList, action.payload);
    // console.log(res.data);
    // put对应redux中的dispatch。
    yield put({ type: types.SET_DAILY_REPORT_LIST, payload: res.data });
  } catch (error) {
    console.log(error.response);
  }
}

function* checkDailyReportEffect(action: ReturnType<typeof checkDailyReportListAction>) {
  try {
    const res = yield call(checkDailyReport, action.payload);
    // 删除操作后用默认条件再获取一次结果，页面中暂未设定查询条件
    const defaultDailyReportSearchForm = {};
    yield put({ type: types.GET_DAILY_REPORT_LIST, payload: defaultDailyReportSearchForm });
  } catch (error) {
    console.log(error.response);
  }
}

// function* getCadreReportEffect(action: ReturnType<typeof getCadreReportListAction>) {
//   try {
//     // console.log(action.payload);
//     const res = yield call(getCadreReportList, action.payload);
//     // console.log(typeof JSON.parse(res.data));
//     // console.log(res.data);
//     // put对应redux中的dispatch。
//     yield put({ type: types.SET_CADRE_REPORT_LIST, payload: res.data });
//   } catch (error) {
//     console.log(error.response);
//   }
// }

// function* checkCadreReportEffect(action: ReturnType<typeof checkCadreReportListAction>) {
//   try {
//     const res = yield call(checkCadreReport, action.payload);
//     // 删除操作后用默认条件再获取一次结果，页面中暂未设定查询条件
//     const defaultCadreReportSearchForm = {};
//     yield put({ type: types.GET_CADRE_REPORT_LIST, payload: defaultCadreReportSearchForm });
//   } catch (error) {
//     console.log(error.response);
//   }
// }

function* rootSaga() {
  yield takeEvery(types.REGISTER_USER, registerUserEffect);
  yield takeEvery(types.LOGIN_USER, loginUserEffect);
  yield takeEvery(types.UPDATE_USER, updateUserEffect);
  yield takeEvery(types.LOGOUT_USER, logoutUserEffect);
  yield takeEvery(types.GET_DEPARTMENT_LIST, getDepartmentListEffect);
  yield takeEvery(types.GET_DAILY_REPORT_LIST, getDailyReportEffect);
  yield takeEvery(types.CHECK_DAILY_REPORT_LIST, checkDailyReportEffect);
  // yield takeEvery(types.GET_CADRE_REPORT_LIST, getCadreReportEffect);
  // yield takeEvery(types.CHECK_CADRE_REPORT_LIST, checkCadreReportEffect);
}

export default rootSaga;
