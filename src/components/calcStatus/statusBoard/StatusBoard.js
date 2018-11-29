import React, { Component } from 'react';
import ItemCard from './ItemCard';
class StatusBoard extends Component {
  render() {
    // <div>Icons made by <a href="https://www.flaticon.com/authors/phatplus" title="phatplus">phatplus</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
    const { sections, status, handleSection, modifyUnbind } = this.props;

    console.log(sections)
    console.log(status)

    return (
      <div className="ui vertically divided grid">
        {sections.map((section, i) => (
          <ItemCard
            key={i}
            index={i}
            section={section}
            item={status[section]}
            handleSection={handleSection}
            modifyUnbind={modifyUnbind}
          />
        ))}
        <ItemCard
          index={sections.length}
          section={"facility"}
        />
      </div>
    );
  }
}

export default StatusBoard;