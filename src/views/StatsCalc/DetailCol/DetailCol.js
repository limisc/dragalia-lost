/* eslint-disable no-unused-vars */
import React from 'react';
import SetBtns from './SetBtns';
import StatsDetail from './StatsDetail';

class DetailCol extends React.Component {
  state = { expand: true };

  render() {
    const { expand } = this.state;
    return (
      <div className="column">
        <SetBtns expand={expand} toggleExpand={this.toggleExpand} />
        <StatsDetail expand={expand} />
      </div>
    );
  }

  toggleExpand = () => this.setState(state => ({ expand: !state.expand }));
}

export default DetailCol;
