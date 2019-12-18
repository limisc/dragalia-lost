import React, { lazy, Suspense, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { getBodyBGC } from 'utils';
import Header from './Header';

const pages = {
  stats: lazy(() => import('./pages/Stats')),
  facility: lazy(() => import('./pages/Facility')),
};

const getRoute = page => {
  const path = `/${page}/:lang?`;
  const Component = pages[page];
  return (
    <Route path={path}>
      <Header />
      <Component />
    </Route>
  );
};

function Routes({ theme }) {
  useEffect(() => {
    if (theme) {
      document.body.style.backgroundColor = getBodyBGC(theme);
    }
  }, [theme]);

  return (
    <Suspense fallback={<div>Loading</div>}>
      <Switch>
        {getRoute('stats')}
        {getRoute('facility')}
        <Redirect to="/stats/:lang?" />
      </Switch>
    </Suspense>
  );
}

const mapStateToProps = ({ theme }) => {
  return { theme };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
