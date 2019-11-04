import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import createRootReducer from './reducers';

export const history = createBrowserHistory();

export default function configureStore() {
    const composeEnhancer: typeof compose =
        (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(
        createRootReducer(history),
        // composeEnhancer(
        //     applyMiddleware(
        //         routerMiddleware(history), // for dispatching history actions
        //         // ... other middlewares ...
        //     ),
        // ),
    );

    // Hot reloading
    // Property 'hot' does not exist on type 'NodeModule'
    // if (module.hot) {
    // if ((module as any).hot) {
    //     // Enable Webpack hot module replacement for reducers
    //     module.hot.accept('./reducers', () => {
    //         store.replaceReducer(createRootReducer(history));
    //     });
    // }
    console.log(store.getState());

    return store;
}
