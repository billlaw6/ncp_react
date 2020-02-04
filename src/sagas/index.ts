import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { setWeChatCodeAction, submitLoginFormAction } from "../store/actions/user";
import {
  submitExamIndexSearchAction,
  getDicomSeriesAction,
  getDicomPicturesAction,
  setDicomSeriesAction,
  setDicomPicturesAction,
} from "../store/actions/dicom";
import { userWeChatLogin, userLogin, getUserInfo } from "../services/user";
import { getExamIndex, getDicomSeries, getDicomSeriesDetail } from "../services/dicom";
import * as types from "../store/action-types";
import { push } from "connected-react-router";
import { store } from "../index";
// import { createBrowserHistory } from "history";
// import { history } from "../store/configureStore";

// const history = createBrowserHistory();
// worker Saga : 将在 action 被 dispatch 时调用
function* weChatLoginE(action: ReturnType<typeof setWeChatCodeAction>) {
  try {
    console.log(action.payload);
    const res = yield call(userWeChatLogin, action.payload);
    console.log(res);
    // put对应redux中的dispatch。
    if (res) {
      const succeededPayload = {
        ...res.data.userInfo,
        token: res.data.key,
      };
      console.log(succeededPayload);
      yield put({ type: types.SET_CURRENT_USER, payload: succeededPayload });
      // 下面两种效果一样
      // history.push('/')
      yield put(push("/"));
    }
  } catch (error) {
    console.log(error.response);
    if (error.response) {
      yield put({ type: types.SET_CURRENT_USER, payload: { token: "" } });
    }
    // history.push('/login/')
    // yield put(push("/login/"));
  }
}

function* formLoginE(action: ReturnType<typeof submitLoginFormAction>) {
  try {
    const res = yield call(userLogin, action.payload);
    console.log(res.data.key);
    yield put({ type: types.SET_CURRENT_USER, payload: { token: res.data.key } });
    // 只变了URL没渲染页面
    // history.push('/')
    yield put(push("/"));
  } catch (error) {
    console.log(error.response);
    // 登录失败先清空本地token，防止无效token判定。
    yield put({ type: types.SET_CURRENT_USER, payload: { token: "" } });
    if (error.response) {
      const failedPayload = {
        ...action.payload,
        message: error.response.data.non_field_errors,
      };
      console.log(failedPayload);
      yield put({ type: types.SET_LOGIN_FORM, payload: failedPayload });
    }
  }
  try {
    const res = yield call(getUserInfo);
    // console.log(res);
    // console.log(store.getState().currentUser);
    // 在原状态上部分更新
    const currentUserInfo = {
      ...store.getState().currentUser,
      ...res.data,
    };
    // console.log(currentUserInfo);
    yield put({ type: types.SET_CURRENT_USER, payload: currentUserInfo });
  } catch (error) {
    console.log("get info error");
    console.log(error.response);
    yield put(push("/login/"));
  }
}

function* searchExamIndexE(action: ReturnType<typeof submitExamIndexSearchAction>) {
  try {
    console.log(action.payload);
    const res = yield call(getExamIndex, action.payload);
    // console.log(typeof JSON.parse(res.data));
    console.log(res.data);
    // put对应redux中的dispatch。
    yield put({ type: types.SET_EXAM_INDEX_LIST, payload: res.data });
  } catch (error) {
    console.log(error.response);
    if (error.response) {
      const failedPayload = {
        ...action.payload,
        message: error.response.data.non_field_errors,
      };
      console.log(failedPayload);
      yield put({ type: types.SET_LOGIN_FORM, payload: failedPayload });
    }
  }
}

function* getDicomSeriesE(action: ReturnType<typeof getDicomSeriesAction>) {
  try {
    console.log(action.payload);
    const res = yield call(getDicomSeries, action.payload);
    console.log(res.data);
    // put对应redux中的dispatch。
    yield put({ type: types.SET_DICOM_SERIES, payload: res.data });
  } catch (error) {
    console.log(error.response);
  }
}

function* getDicomPicturesE(action: ReturnType<typeof getDicomPicturesAction>) {
  try {
    console.log(action.payload);
    const res = yield call(getDicomSeriesDetail, action.payload);
    console.log(res.data);
    // put对应redux中的dispatch。
    yield put({ type: types.SET_DICOM_PICTURES, payload: res.data });
  } catch (error) {
    console.log(error.response);
  }
}

function* rootSaga() {
  yield takeEvery(types.SET_WECHAT_CODE, weChatLoginE);
  yield takeEvery(types.SUBMIT_LOGIN_FORM, formLoginE);
  yield takeEvery(types.SUBMIT_EXAM_INDEX_SEARCH_FORM, searchExamIndexE);
  yield takeEvery(types.GET_DICOM_SERIES, getDicomSeriesE);
}

export default rootSaga;
