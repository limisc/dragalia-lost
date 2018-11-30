import React, { Component } from 'react';
import SingleStats from './SingleStats';
import PropTypes from 'prop-types';

class StatsList extends Component {

  shouldComponentUpdate(nextProps) {
    return true;
  }

  render() {
    const { sections, stats, handleSection, updateLevel, updateMana, modifyUnbind } = this.props;
    return (
      <div className="ui vertically divided grid">
        {sections.map((section, i) => (
          <SingleStats
            key={i}
            section={section}
            stats={stats[section]}
            handleSection={handleSection}
            updateLevel={updateLevel}
            modifyUnbind={modifyUnbind}
          />
        ))}
      </div>
    );
  }
}

StatsList.propTypes = {
  sections: PropTypes.array,
  stats: PropTypes.object,
  handleSection: PropTypes.func,
  updateLevel: PropTypes.func,
  updateMana: PropTypes.func,
  modifyUnbind: PropTypes.func,
};

export default StatsList;