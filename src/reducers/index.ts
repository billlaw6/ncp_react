import { combineReducers } from 'redux';
import { History } from 'history';
import { connectRouter, RouterState } from 'connected-react-router';
import draftReducer from './draft';

const createRootReducer = (history: History) =>
    combineReducers({
        router: connectRouter(history),
        draft: draftReducer,
    });

export default createRootReducer;
