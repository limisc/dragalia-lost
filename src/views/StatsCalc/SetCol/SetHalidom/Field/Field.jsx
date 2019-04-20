//@flow
/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import Item from './Item';

class Field extends React.Component {
  render() {
    const { fKey, sKey, halidom } = this.props;
    const section = halidom[fKey][sKey];
    return (
      <>
        {section
          ? Object.keys(section).map(iKey => (
              <Item
                key={iKey}
                fKey={fKey}
                sKey={sKey}
                iKey={iKey}
                item={section[iKey]}
              />
            ))
          : undefined}
      </>
    );
  }
}

const mapStateToProps = ({ halidom }) => {
  return {
    halidom,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // TODO clear
    //: () => dispatch(),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Field);

/*
import React from 'react';


class Field extends React.PureComponent {
  render() {
    const { section, ...res } = this.props;
    return (
      <>
        {Object.keys(section).map(iKey => (
          <Item key={iKey} iKey={iKey} item={section[iKey]} {...res} />
        ))}
      </>
    );
  }
}

export default Field;

*/
