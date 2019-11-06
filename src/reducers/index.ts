import { combineReducers } from 'redux';
import { History } from 'history';
import { RouterState, connectRouter } from 'connected-react-router';
// import draftReducer from './draft';
import counterReducer from './counter';

const createRootReducer = (history: History) =>
    combineReducers({
        count: counterReducer,
        router: connectRouter(history),
    });

// IState不能作为组件创建时props类型！！！必须用store.d里定义的！三天的教训！
// export type IState = ReturnType<typeof createRootReducer>

export default createRootReducer;
