//@flow
/* eslint-disable no-unused-vars */
import React from 'react';
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
      <tr>
        {section ? (
          <>
            <td className="overview">
              <Image size="sm" dir="icon" image={`${fKey}_${sKey}`} />
            </td>
            <td className="overview">{value.HP}</td>
            <td className="overview">{value.STR}</td>
          </>
        ) : (
          undefined
        )}
      </tr>
    );
  }
}

const mapStateToProps = ({ halidom }) => {
  return {
    halidom,
  };
};

export default connect(mapStateToProps)(Overview);
