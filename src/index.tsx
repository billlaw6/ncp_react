import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import App from './App';
import configureStore, { history } from './configureStore';

let store = configureStore();
// 将store传入app根结点，与整个生命周期绑定
// 初始数据在各个reducer中，通过configureStore整合进来，
// 又在各组件中通过mapStateToProps取走各组件需要的部分。
ReactDOM.render(
    <Provider store={store}>
        <App history={history} />
    </Provider>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
