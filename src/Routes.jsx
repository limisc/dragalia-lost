import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const pages = {
  stats: lazy(() => import('./pages/Stats')),
};

const getRoute = page => {
  const path = `/${page}/:lang?`;
  const Component = pages[page];
  return (
    <Route path={path}>
      <Component />
    </Route>
  );
};

function Routes() {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <Switch>
        {getRoute('stats')}
        <Redirect to="/stats/:lang?" />
      </Switch>
    </Suspense>
  );
}

export default Routes;
