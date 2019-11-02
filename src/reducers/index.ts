import { combineReducers } from 'redux';
import { History } from 'history';
import { connectRouter, RouterState } from 'connected-react-router';
import draftReducer from './draft';
import counterReducer from './counter';

const createRootReducer = (history: History) =>
    combineReducers({
        router: connectRouter(history),
        draft: draftReducer,
        counter: counterReducer,
    });

export interface State {
    draft: {};
    counter: {};
    router: RouterState;
}

export default createRootReducer;
