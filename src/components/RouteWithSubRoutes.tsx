import React, { SFC, ReactNode } from 'react';
import { Route } from 'react-router-dom';


// const RouteWithSubRoutes: SFC<any> = (route: any) => {
// 二级路由路径需要非exact匹配？从路由配置里取值更灵活
function RouteWithSubRoutes(route: any) {
    return (
        <Route
            path={route.path}
            exact={route.exact}
            render={(props) => (
                <route.component {...props} routes={route.routes} />
            )}
        />
    )
}

export default RouteWithSubRoutes;