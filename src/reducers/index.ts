import { combineReducers } from 'redux';
import { History } from 'history';
import { RouterState, connectRouter } from 'connected-react-router';
// import draftReducer from './draft';
import counterReducer from './counter';

const rootReducer = (history: History) =>
    combineReducers({
        count: counterReducer,
        router: connectRouter(history),
    });

export type IState = ReturnType<typeof rootReducer>

export default rootReducer;
