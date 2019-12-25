import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import {
  setWeChatCodeAction,
  submitLoginFormAction,
} from '../store/actions/user';
import { userWeChatLogin, userLogin } from '../services/user';
import * as types from '../store/action-types';

// worker Saga : 将在 action 被 dispatch 时调用
function* weChatLogin(action: ReturnType <typeof setWeChatCodeAction>) {
  try {
    // console.log(action.payload);
    const res = yield call(userWeChatLogin, action.payload);
    console.log(res);
    // put对应redux中的dispatch。
    const succeededPayload = {
      ...res.data.userInfo,
      token: res.data.key,
      message: '',
    }
    console.log(succeededPayload);
    yield put({ type: types.SET_CURRENT_USER, payload: succeededPayload });
  } catch (error) {
    console.log(error.response);
    if (error.response) {
      yield put({ type: types.SET_CURRENT_USER, payload: {token: ''}});
    }
  }
}

function* formLogin(action: ReturnType <typeof submitLoginFormAction>) {
  try {
    const res = yield call(userLogin, action.payload);
    console.log(res);
    // put对应redux中的dispatch。
    yield put({ type: types.SET_CURRENT_USER, payload: {token: res.data.key}});
  } catch (error) {
    console.log(error.response);
    if (error.response) {
      const failedPayload = {
        ...action.payload,
        message: error.response.data.non_field_errors,
      }
      console.log(failedPayload);
      yield put({ type: types.SET_LOGIN_FORM, payload: failedPayload });
    }
  }
}


function* rootSaga() {
  yield takeEvery(types.SET_WECHAT_CODE, weChatLogin);
  yield takeEvery(types.SUBMIT_LOGIN_FORM, formLogin);
}

export default rootSaga;