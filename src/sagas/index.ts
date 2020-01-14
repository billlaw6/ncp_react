import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { setWeChatCodeAction, submitLoginFormAction } from "../store/actions/user";
import { submitExamIndexSearchAction } from "../store/actions/dicom";
import { userWeChatLogin, userLogin } from "../services/user";
import { getExamIndex } from "../services/dicom";
import * as types from "../store/action-types";
import { push } from "connected-react-router";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();
// worker Saga : 将在 action 被 dispatch 时调用
function* weChatLogin(action: ReturnType<typeof setWeChatCodeAction>) {
  try {
        console.log(action.payload);
        const res = yield call(userWeChatLogin, action.payload);
        console.log(res);
        // put对应redux中的dispatch。
        const succeededPayload = {
          ...res.data.userInfo,
          token: res.data.key,
          message: "",
        };
        console.log(succeededPayload);
        yield put({ type: types.SET_CURRENT_USER, payload: succeededPayload });
        // 下面两种效果一样
        // history.push('/dicom/upload/')
        yield put(push("/dicom/upload/"));
      } catch (error) {
    console.log(error.response);
    if (error.response) {
      yield put({ type: types.SET_CURRENT_USER, payload: { token: "" } });
    }
    // history.push('/login/')
    yield put(push("/login/"));
  }
}

function* formLogin(action: ReturnType<typeof submitLoginFormAction>) {
  try {
    const res = yield call(userLogin, action.payload);
    console.log(res);
    // put对应redux中的dispatch。
    yield put({ type: types.SET_CURRENT_USER, payload: { token: res.data.key } });
    // 只变了URL没渲染页面
    // history.push('/dicom/upload/')
    yield put(push("/dicom/upload/"));
  } catch (error) {
    console.log(error.response);
    if (error.response) {
                          const failedPayload = {
                            ...action.payload,
                            message: error.response.data.non_field_errors,
                          };
                          console.log(failedPayload);
                          yield put({ type: types.SET_LOGIN_FORM, payload: failedPayload });
                          // history.push('/login/')
                          yield put(push("/login/"));
                        }
  }
}

  function* searchExamIndex(action: ReturnType<typeof submitExamIndexSearchAction>) {
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

  function* rootSaga() {
    yield takeEvery(types.SET_WECHAT_CODE, weChatLogin);
    yield takeEvery(types.SUBMIT_LOGIN_FORM, formLogin);
    yield takeEvery(types.SUBMIT_EXAM_INDEX_SEARCH_FORM, searchExamIndex);
  }

  export default rootSaga;
