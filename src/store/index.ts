import { routerMiddleware, routerReducer } from 'react-router-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();
const middleware = routerMiddleware(history)

const store = createStore(
    combineReducers({
        router: routerReducer,
    }),
    process.env.NODE_ENV === 'development' ?
        composeWithDevTools(applyMiddleware(middleware)) :
        applyMiddleware(middleware)
)


export default store
