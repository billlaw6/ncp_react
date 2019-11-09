import { combineReducers } from 'redux';
import { History } from 'history';
import { RouterState, connectRouter } from 'connected-react-router';
import userReducer from './user';
import draftReducer from './draft';
import canvasReducer from './canvas';
import counterReducer from './counter';

// 每个reducer必须都返回state类型的数据！
const createRootReducer = (history: History) =>
    combineReducers({
        user: userReducer,
        count: counterReducer,
        draft: draftReducer,
        canvas: canvasReducer,
        router: connectRouter(history),
    });

// IState不能作为组件创建时props类型！！！必须用store.d里定义的！三天的教训！
// export type IState = ReturnType<typeof createRootReducer>

export default createRootReducer;
