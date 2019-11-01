import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import draft from './draft';

const createRootReducer = (history: any) =>
    combineReducers({
        router: connectRouter(history),
        draft,
    });

export default createRootReducer;
