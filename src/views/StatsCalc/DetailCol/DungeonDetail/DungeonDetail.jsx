//@flow
/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import DungeonSelect from './DungeonSelect';
import DungeonSettings from './DungeonSettings';
import DamageBar from './DamageBar';

class DungeonDetail extends React.Component {
  render() {
    const { dungeon, onChange, ...res } = this.props;

    return (
      <div>
        <div
          style={{
            height: '60px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          DungonInfo
        </div>
        <DungeonSelect dungeon={dungeon} onChange={onChange} />
        <DungeonSettings onChange={onChange} {...res} />
      </div>
    );
  }
}

const mapStateToProps = () => {
  return {};
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
)(DungeonDetail);
