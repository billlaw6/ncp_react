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
import {
  dicomSearchFailedAction,
  dicomSearchRequstedAction,
  dicomSearchSucceededAction,
  DICOM_SEARCH_FAILED_ACTION,
  DICOM_SEARCH_REQUESTED_ACTION,
  DICOM_SEARCH_SUCCEEDED_ACTION,
} from '../actions/dicom';
import { searchDicomInfo, searchDicomFile } from '../services/dicom';

// worker Saga : 将在 USER_FETCH_REQUESTED action 被 dispatch 时调用
declare type ITokenActionType = ReturnType<typeof tokenFetchSucceededAction> &
  ReturnType<typeof tokenFetchFailedAction> &
  ReturnType<typeof tokenFetchRequstedAction>
function* fetchToken(action: ITokenActionType) {
  try {
    // console.log(action.payload);
    const res = yield call(userLogin, action.payload);
    console.log(res);
    // put对应redux中的dispatch。
    const succeededPayload = {
      ...action.payload,
      token: res.data.key,
      message: '',
    }
    console.log(succeededPayload);
    yield put({ type: TOKEN_FETCH_SUCCEEDED_ACTION, payload: succeededPayload });
  } catch (error) {
    console.log(error.response);
    if (error.response) {
      const failedPayload = {
        ...action.payload,
        token: '',
        message: error.response.data.non_field_errors,
      }
      // console.log(failedPayload);
      yield put({ type: TOKEN_FETCH_FAILED_ACTION, payload: failedPayload });
    }
  }
}

declare type IDicomInfoActionType = ReturnType<typeof tokenFetchSucceededAction> &
  ReturnType<typeof tokenFetchFailedAction> &
  ReturnType<typeof tokenFetchRequstedAction>
function* fetchDicomInfo(action: IDicomInfoActionType) {
  try {
    // console.log(action.payload);
    const res = yield call(searchDicomInfo, action.payload);
    console.log(res);
    // put对应redux中的dispatch。
    const succeededPayload = {
      ...action.payload,
      count: res.data.count,
      results: res.data.results,
    }
    console.log(succeededPayload);
    yield put({ type: DICOM_SEARCH_SUCCEEDED_ACTION , payload: succeededPayload });
  } catch (error) {
    console.log(error.response);
    const failedPayload = {
      ...action.payload,
      count: 0,
      results: [],
    }
    console.log(failedPayload);
    yield put({ type: DICOM_SEARCH_FAILED_ACTION, payload: failedPayload });
  }
}

function* rootSaga() {
  yield takeEvery(TOKEN_FETCH_REQUESTED_ACTION, fetchToken);
  yield takeEvery(DICOM_SEARCH_REQUESTED_ACTION, fetchDicomInfo);
}

export default rootSaga;