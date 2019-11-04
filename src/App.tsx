import React from 'react';
// 官网推荐安装react-router-dom，react-router会被当依赖自动安装。
// 使用中猜测用react-router可能兼容性更高
import { History } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import routes from './routes';

interface AppProps {
    history: History;
}

const App = ({ history }: AppProps) => {
    return (
        <ConnectedRouter history={history}>{routes}</ConnectedRouter>
    );
};

export default App;
