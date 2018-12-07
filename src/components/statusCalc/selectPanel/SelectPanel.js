import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import uuidv4 from 'uuid/v4';
import FilterForm from './FilterForm';
import ListItem from './ListItem';

function mapStateToProps(state) {
  // console.log(state)
  const {
    selectedSection, filters,
    UIData: {
      selectData: {
        [selectedSection]: data = []
      },
      filterOptions: { element },
    },
  } = state;

  return {
    selectedSection,
    filters,
    data,
    element,
  };
}

class SelectPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterFields: {
        adventurer: ["type", "rarity", "element"],
        weapon: ["type", "rarity", "tier"],
        wyrmprint: ["rarity"],
        dragon: ["rarity", "element"],
      },
    }
  }

  shouldComponentUpdate(nextProps) {
    const { selectedSection, filters } = this.props;
    return nextProps.selectedSection !== selectedSection || nextProps.filters !== filters;
  }
  render() {
    const { selectedSection, filters, data, element } = this.props;
    const { filterFields: { [selectedSection]: filterField } } = this.state;
    return (
      <Fragment>
        {selectedSection &&
          <Fragment>
            <FilterForm
              filterField={filterField}
            />
            <table className="ui celled table">
              <thead>
                <tr>
                  <th>{this.capitalise(selectedSection)}</th>
                  <th>Name</th>
                  {filterField.map((field, i) => <th key={i}>{this.capitalise(field)}</th>)}
                </tr>
              </thead>

              <tbody>

                {data
                  .filter(status => filterField.every(key => status[key].includes(filters[key])))
                  .sort((status1, status2) => status1.Name.localeCompare(status2.Name))
                  .sort((status1, status2) => element.indexOf(status1.element) - element.indexOf(status2.element))
                  .sort((status1, status2) => status2.tier - status1.tier)
                  .sort((status1, status2) => status2.rarity - status1.rarity)
                  .map(status =>
                    <ListItem
                      key={uuidv4()}
                      section={selectedSection}
                      filterField={filterField}
                      status={status}
                    />
                  )
                }
              </tbody>
            </table>
          </Fragment>
        }
      </Fragment>
    );
  }

  capitalise(word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }
}

export default connect(
  mapStateToProps,
)(SelectPanel);