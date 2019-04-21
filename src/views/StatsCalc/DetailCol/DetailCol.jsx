//@flow
/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import Settings from './Settings';

class DetailCol extends React.Component {
  render() {
    return (
      <>
        <Settings />
      </>
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
)(DetailCol);

// import React from 'react';
// import { connect } from 'react-redux';
// import { getDetails } from 'appRedux/actions';
// import StatsDetail from './StatsDetail';
// import DungeonSelect from './DungeonSelect';

// class DetailCol extends React.Component {
//   state = {
//     open: true,
//     dungeon: 'hmc',
//   };

//   render() {
//     const { open, dungeon } = this.state;
//     const { stats, halidom } = this.props;
//     const cursor = open ? 'n-resize' : 's-resize';
//     const title = stats.adventurer ? stats.adventurer.name : '';
//     const details = getDetails(stats, halidom);
//     return (
//       <>
//         <StatsDetail
//           cursor={cursor}
//           open={open}
//           title={title}
//           details={details}
//           onClick={this.onClick}
//         />

//         <DungeonSelect dungeon={dungeon} onChange={this.onChange} />
//       </>
//     );
//   }

//   onClick = () => {
//     this.setState(state => ({ open: !state.open }));
//   };

//   onChange = ({ target: { name, value } }) => this.setState({ [name]: value });
// }

// const mapStateToProps = ({ stats, halidom }) => {
//   return { stats, halidom };
// };

// export default connect(mapStateToProps)(DetailCol);
