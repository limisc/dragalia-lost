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

  shouldComponentUpdate(nextProps) {
    //because for each statusField, section will not change except change coding layout.
    const { section } = nextProps;
    return nextProps.statusSets[section] !== this.props.statusSets[section];
  }

  render() {
    const { section } = this.props;
    console.log("Status.js", section)
    return (
      <div className="column">
        <div className="ui two column grid">
          <div className="six wide column">
            <StatusAvatar
              section={section}
            />
          </div>

          <div className="nine wide column">
            <StatusFields
              section={section}
            />
          </div>
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