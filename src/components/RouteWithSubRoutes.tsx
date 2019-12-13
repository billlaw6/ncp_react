import React, { SFC, ReactNode } from 'react';
import { Route } from 'react-router-dom';


// const RouteWithSubRoutes: SFC<any> = (route: any) => {
function RouteWithSubRoutes(route: any) {
    return (
        <Route
            path={route.path}
            exact
            // component={route.component}
            render={(props) => (
                <route.component {...props} routes={route.routes} />
            )}
        />
    )
}

export default RouteWithSubRoutes;