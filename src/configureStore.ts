import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';    // default to localStorage for web
import { routerMiddleware } from 'connected-react-router';
// import thunk from 'redux-thunk';
import createRootReducer from './reducers';

export const history = createBrowserHistory();

const persistConfig = {
    key: 'root',
    storage,
}
const persistedReducer = persistReducer(persistConfig, createRootReducer(history))

export default function configureStore(preloadedState?: any) {
    const composeEnhancer: typeof compose =
        (window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;

    const store = createStore(
        persistedReducer,
        preloadedState,
        composeEnhancer(applyMiddleware(routerMiddleware(history))),
    );

    const persistor = persistStore(store)

    // Hot reloading
    // Property 'hot' does not exist on type 'NodeModule'
    // if ((module as any).hot) {
    //     // Enable Webpack hot module replacement for reducers
    //     module.hot.accept('./reducers', () => {
    //         store.replaceReducer(createRootReducer(history));
    //     });
    // }

    return { store, persistor };
}
