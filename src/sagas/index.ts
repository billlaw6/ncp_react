import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import {
  TOKEN_FETCH_REQUESTED_ACTION,
  TOKEN_FETCH_SUCCEEDED_ACTION,
  TOKEN_FETCH_FAILED_ACTION,
  tokenFetchRequstedAction,
  tokenFetchSucceededAction,
  tokenFetchFailedAction,
} from '../actions/token';
import { userLogin } from '../services/user';

// worker Saga : 将在 USER_FETCH_REQUESTED action 被 dispatch 时调用
declare type IActionType = ReturnType<typeof tokenFetchSucceededAction> &
  ReturnType<typeof tokenFetchFailedAction> &
  ReturnType<typeof tokenFetchRequstedAction>
function* fetchToken(action: IActionType) {
  try {
    console.log(action.payload);
    const res = yield call(userLogin, action.payload);
    console.log(res);
    // put对应redux中的dispatch。
    const succeededPayload = {
      ...action.payload,
      token: res.data.key,
      message: '',
    }
    console.log(succeededPayload);
    yield put({ type: TOKEN_FETCH_SUCCEEDED_ACTION, playload: succeededPayload });
  } catch (error) {
    console.log(error.response);
    const failedPayload = {
      ...action.payload,
      token: '',
      message: error.response.data.non_field_errors,
    }
    console.log(failedPayload);
    yield put({ type: TOKEN_FETCH_FAILED_ACTION, playload: failedPayload });
  }
}

function* rootSaga() {
  yield takeEvery(TOKEN_FETCH_REQUESTED_ACTION, fetchToken);
  // yield takeLatest(TOKEN_FETCH_REQUESTED_ACTION, fetchToken);
}

export default rootSaga;