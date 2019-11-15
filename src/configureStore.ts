import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';    // default to localStorage for web
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import createRootReducer from './reducers';
import createSagaMiddleware from 'redux-saga';
import mySaga from './middleware/sagas';

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
    key: 'root',    // 必须有
    storage,    // storage is now required
    // blacklist: ['routor'],   // reducer里不持久化的数据
}

export default function configureStore(preloadedState?: any) {
    const composeEnhancer: typeof compose =
        (window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;

    const store = createStore(
        persistReducer(persistConfig, createRootReducer(history)),
        // createRootReducer(history), // root reducer with router state
        preloadedState,
        composeEnhancer(
            applyMiddleware(
                routerMiddleware(history),  // for dispatching history actions
                // ... other middlewares ...
                sagaMiddleware,
                thunk,
            ),
        ),
    );

    // Hot reloading
    // Property 'hot' does not exist on type 'NodeModule'
    // if ((module as any).hot) {
    //     // Enable Webpack hot module replacement for reducers
    //     module!.hot.accept('./reducers', () => {
    //         store.replaceReducer(createRootReducer(history));
    //     });
    // }

    sagaMiddleware.run(mySaga);
    return store;
}
