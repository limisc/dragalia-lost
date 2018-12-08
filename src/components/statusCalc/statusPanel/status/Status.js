import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import StatusAvatar from './StatusAvatar';
import StatusFields from './statusFields/StatusFields';

const mapStateToProps = (state) => {
  const { statusSets } = state;
  return {
    statusSets
  };
}

class Status extends Component {

  // constructor(props) {
  //   super(props);
  // }

  // shouldComponentUpdate(nextProps) {
  //   const { section, statusSets: { [section]: status } } = this.props;
  //   const { [section]: nextStatus } = nextProps.statusSets;

  //   console.log("status", status)
  //   console.log("nextStatus", nextStatus)
  //   if (!status && !nextStatus) {
  //     return false;
  //   }
  //   return (status !== nextStatus);
  // }

  render() {
    const { section } = this.props;
    // console.log("Status.js", section)

    return (
      <div className="column">
        <div className="ui two column grid">
          <StatusAvatar
            section={section}
          />
          <StatusFields
            section={section}
          />
        </div>
      </div>
    );
  }
}

Status.propTypes = {
  section: PropTypes.string.isRequired,
}
export default connect(
  mapStateToProps,
)(Status);