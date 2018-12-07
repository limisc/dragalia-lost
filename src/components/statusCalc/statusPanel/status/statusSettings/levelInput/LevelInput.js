import React, { Component } from 'react';
import InputItem from './InputItem'
import MaxLevelButton from './MaxLevelButton';

class LevelInput extends Component {
  render() {
    const { section } = this.props;
    return (
      <div className="equal width fields">
        <InputItem
          label="level"
          section={section}
        />

        <MaxLevelButton
          section={section}
        />
      </div>
    );
  }
}

export default LevelInput;