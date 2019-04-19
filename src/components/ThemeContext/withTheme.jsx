import React from 'react';
import ThemeContext from './context';

const withTheme = Component => {
  return props => (
    <ThemeContext.Consumer>
      {contexts => <Component {...props} {...contexts} />}
    </ThemeContext.Consumer>
  );
};

export default withTheme;
