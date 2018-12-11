import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import StatsAvatar from './StatsAvatar';
// import StatsFields from './statsFields/StatsFields';

const mapStateToProps = (state) => {
  return {
    stats: state.stats,
  };
}

class Stats extends Component {

  render() {
    const { section } = this.props;
    return (
      <div className="column">
        <div className="ui two column grid">
          <StatsAvatar
            section={section}
          />
          {/* <StatsFields
            section={section}
          /> */}
        </div>
      </div>
    );
  }
}

Stats.propTypes = {
  section: PropTypes.string.isRequired,
}
export default connect(
  mapStateToProps,
)(Stats);