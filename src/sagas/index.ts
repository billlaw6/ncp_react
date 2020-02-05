import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  setWeChatCodeAction,
  submitLoginFormAction,
  agreePrivacyNoticeAction,
} from "../store/actions/user";
import {
  getExamIndexListAction,
  getDicomSeriesAction,
  getDicomPicturesAction,
  setDicomSeriesAction,
  setDicomPicturesAction,
  getDicomSeriesMprAction,
  setDicomSeriesMprAction,
} from "../store/actions/dicom";
import {
  userWeChatLogin,
  userLogin,
  getUserInfo,
  getPrivacyNotice,
  agreePrivacyNotice,
} from "../services/user";
import {
  getExamIndex,
  getDicomSeries,
  getDicomSeriesDetail,
  getDicomSeriesMprDetail,
} from "../services/dicom";
import * as types from "../store/action-types";
import { push } from "connected-react-router";
import { store } from "../index";

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
      yield put(push("/"));
    }
  } catch (error) {
    console.log(error.response);
    if (error.response) {
      yield put({ type: types.SET_CURRENT_USER, payload: { token: "" } });
    }
  }
}

function* formLoginE(action: ReturnType<typeof submitLoginFormAction>) {
  try {
    const res = yield call(userLogin, action.payload);
    console.log(res.data.key);
    yield put({ type: types.SET_CURRENT_USER, payload: { token: res.data.key } });
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

function* getExamIndexE(action: ReturnType<typeof getExamIndexListAction>) {
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

  function* getDicomSeriesMprE(action: ReturnType<typeof getDicomSeriesMprAction>) {
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

function* getDicomSeriesMprE(action: ReturnType<typeof getDicomSeriesMprAction>) {
  try {
    console.log(action.payload);
    const res = yield call(getDicomSeriesMprDetail, action.payload);
    console.log(res.data);
    // put对应redux中的dispatch。
    yield put({ type: types.SET_DICOM_SERIES_MPR, payload: res.data });
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

function* getPrivacyNoticeE(action: ReturnType<typeof getDicomPicturesAction>) {
  try {
    console.log(action.payload);
    const res = yield call(getPrivacyNotice);
    console.log(res.data);
    // put对应redux中的dispatch。
    yield put({ type: types.SET_PRIVACY_NOTICE, payload: res.data });
  } catch (error) {
    console.log(error.response);
  }
}

function* agreePrivacyNoticeE(action: ReturnType<typeof agreePrivacyNoticeAction>) {
  try {
    console.log(action.payload);
    const res = yield call(agreePrivacyNotice, action.payload);
    console.log(res.data);
    // put对应redux中的dispatch。
    yield put({ type: types.SET_PRIVACY_NOTICE, payload: action.payload });
    const currentUserInfo = {
      ...store.getState().currentUser,
      ...{ privacyNotice: action.payload.privacy_notice_id },
    };
    yield put({ type: types.SET_CURRENT_USER, payload: currentUserInfo });
  } catch (error) {
    console.log(error.response);
  }
}

function* rootSaga() {
  yield takeEvery(types.SET_WECHAT_CODE, weChatLoginE);
  yield takeEvery(types.SUBMIT_LOGIN_FORM, formLoginE);
  yield takeEvery(types.GET_EXAM_INDEX_LIST, getExamIndexE);
  yield takeEvery(types.GET_DICOM_SERIES, getDicomSeriesE);
  yield takeEvery(types.GET_DICOM_SERIES_MPR, getDicomSeriesMprE);
  yield takeEvery(types.GET_PRIVACY_NOTICE, getPrivacyNoticeE);
  yield takeEvery(types.AGREE_PRIVACY_NOTICE, agreePrivacyNoticeE);
}

export default rootSaga;
