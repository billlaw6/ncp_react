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
// const fakeAuth = {
//     isAuthenticated: true,
//     authenticate(cb: any) {
//         fakeAuth.isAuthenticated = true;
//         setTimeout(cb, 100); // fake async
//     },
//     signout(cb: any) {
//         fakeAuth.isAuthenticated = false;
//         setTimeout(cb, 100);
//     },
// };

// function PrivateRoute({ children, ...rest }: any) {
//     return (
//         <Route
//             {...rest}
//             render={({ location }) =>
//                 fakeAuth.isAuthenticated ? (
//                     children
//                 ) : (
//                     <Redirect
//                         to={{
//                             pathname: '/login',
//                             state: { from: location },
//                         }}
//                     />
//                 )
//             }
//         />
//     );
// }

// provide initial state if any
// const store = configureStore();

// export default function routerConfig() {
//     return (
//         <Provider store={store}>
//             <Router history={history}>
//                 <div>
//                     {/* A <Switch> looks through its children <Route>s and
//                     renders the first one that matches the current URL. */}
//                     <Switch>
//                         <Route path="/login" component={Login}></Route>
//                         <PrivateRoute path="/canvas">
//                             <Canvas />
//                         </PrivateRoute>
//                         <Route path="/edit" component={Edit}></Route>
//                         <Route exact path="/" component={Home}></Route>
//                     </Switch>
//                 </div>
//             </Router>
//         </Provider>
//     );
// }
