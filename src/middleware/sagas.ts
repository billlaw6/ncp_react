import { call, put, takeLatest } from 'redux-saga/effects';
import { SET_TOKEN_ACTION_TYPE, DEL_TOKEN_ACTION_TYPE, setTokenAction, delTokenAction } from '../actions/token';
import { userLogin } from './user';

// worker Saga : 将在 USER_FETCH_REQUESTED action 被 dispatch 时调用
declare type IActionType = ReturnType<typeof setTokenAction> & ReturnType<typeof delTokenAction>
function* fetchToken(action: IActionType) {
    try {
       const token = yield call(userLogin, action.payload);
       yield put({type: SET_TOKEN_ACTION_TYPE, user: token});
    } catch (e) {
       yield put({type: DEL_TOKEN_ACTION_TYPE});
    }
 }
 
 /*
   在每个 `USER_FETCH_REQUESTED` action 被 dispatch 时调用 fetchUser
   允许并发（译注：即同时处理多个相同的 action）
 */
//  function* mySaga() {
//    yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
//  }
 
 /*
   也可以使用 takeLatest
 
   不允许并发，dispatch 一个 `USER_FETCH_REQUESTED` action 时，
   如果在这之前已经有一个 `USER_FETCH_REQUESTED` action 在处理中，
   那么处理中的 action 会被取消，只会执行当前的
 */
 function* mySaga() {
   yield takeLatest(SET_TOKEN_ACTION_TYPE, fetchToken);
 }
 
 export default mySaga;