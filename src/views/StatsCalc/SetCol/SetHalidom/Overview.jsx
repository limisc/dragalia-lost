//@flow
/* eslint-disable no-unused-vars */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { calcSection } from 'appRedux/actions';
import { Image } from 'components';

class Overview extends React.Component {
  render() {
    const { fKey, sKey, halidom } = this.props;
    const section = halidom[fKey][sKey];
    const value = calcSection(section);
    // TODO Memo
    return (
      <Fragment>
        {section ? (
          <tr>
            <td>
              <Image size="sm" dir="icon" image={`${fKey}_${sKey}`} />
            </td>
            <td>{value.HP}</td>
            <td>{value.STR}</td>
          </tr>
        ) : (
          undefined
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = ({ halidom }) => {
  return {
    halidom,
  };
};

export default connect(mapStateToProps)(Overview);
