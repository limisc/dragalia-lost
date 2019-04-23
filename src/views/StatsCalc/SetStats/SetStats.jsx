//@flow
/* eslint-disable no-unused-vars */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
import { statsKeys } from 'appRedux/store';
import StatsField from './StatsField';

class SetStats extends React.Component {
  state = {
    search: '',
  };

  // static getDerivedStateFromProps(props, state) {
  //   const {
  //     // syncStats,
  //     history: { action },
  //     location: { search },
  //   } = props;

  //   if (search !== state.search) {
  //     if (action === "POP") {
  //       // syncStats(search);
  //     }

  //     return {
  //       search,
  //     };
  //   }

  //   return null;
  // }

  render() {
    const { stats } = this.props;
    return (
      <Fragment>
        {statsKeys.map(statsKey => {
          const id = stats[statsKey] ? stats[statsKey].id : statsKey;
          return <StatsField key={id} statsKey={statsKey} />;
        })}
      </Fragment>
    );
  }
}

const mapStateToProps = ({ stats }) => {
  return { stats };
};

const mapDispatchToProps = dispatch => {
  return {
    // TODO clear
    //: () => dispatch(),
  };
};

// TODO withRouter, implement search query
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetStats);
