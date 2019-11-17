import { call, put, takeLatest } from 'redux-saga/effects';
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
  ReturnType<typeof tokenFetchFailedAction>
function* fetchToken(action: IActionType) {
  try {
    console.log(action.payload);
    const token = yield call(userLogin, action.payload);
    // put对应redux中的dispatch。
    yield put({ type: TOKEN_FETCH_SUCCEEDED_ACTION, value: token });
  } catch (e) {
    yield put({ type: TOKEN_FETCH_FAILED_ACTION });
  }
}

function* rootSaga() {
//    yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
  yield takeLatest(TOKEN_FETCH_REQUESTED_ACTION, fetchToken);
}

export default rootSaga;