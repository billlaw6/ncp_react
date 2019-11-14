import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { ConnectedRouter } from 'connected-react-router';
import configureStore, { history } from './configureStore';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { IntlProvider, FormattedMessage } from 'react-intl';

// let { store, persistor } = configureStore();
let store = configureStore();
// 将store传入app根结点，与整个生命周期绑定
// 初始数据在各个reducer中，通过configureStore整合进来，
// 又在各组件中通过mapStateToProps取走各组件需要的部分。
if (module.hot) {
    console.log('hot');
}

ReactDOM.render(
    <AppContainer>
        <Provider store={store}>
            { /* place ConnectedRouter under Provider */}
            <ConnectedRouter history={history}>
                { /* your usual react-router v4/v5 routing */}
                <IntlProvider locale="en">
                    <App />
                </IntlProvider>
            </ConnectedRouter>
        </Provider>
    </AppContainer >,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
