import React from 'react';
import Context from './Context';

const withTheme = Component => {
  return props => (
    <Context.Consumer>
      {contexts => <Component {...props} {...contexts} />}
    </Context.Consumer>
  );
};
export default withTheme;
