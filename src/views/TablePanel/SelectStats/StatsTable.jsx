// @flow
/* eslint-disable no-unused-vars */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  WindowScroller,
  AutoSizer,
  Table,
  Column,
  List,
  CellMeasurer,
  CellMeasurerCache,
  InfiniteLoader,
} from 'react-virtualized';

import {
  adventurer,
  adventurer_uid,
  weapon,
  wyrmprint,
  dragon,
} from "data";

import {
  getSection,
} from "actions";
import ListItem from "./ListItem";

const propTypes = {

};

const defaultProps = {

};

// const items = Array.from(
//   { length: 100 },
//   (_, i) => ({ name: faker.name.findName(), email: faker.internet.email() })
// );

class StatsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        adventurer,
        weapon,
        wyrmprint,
        dragon,
      },
      uid: {
        adventurer: adventurer_uid,
        weapon,
        wyrmprint,
        dragon,
      },
    };

  }

  render() {
    const {
      focusStats,
    } = this.props;

    const section = getSection(focusStats);

    const { [section]: id_list } = this.state.uid;
    const { [section]: data } = this.state.data;
    return (
      <div
        style={{
          flex: 1,
        }}
      >
        <WindowScroller>
          {({ height, scrollTop }) => {
            return (
              <AutoSizer disableHeight>
                {({ width }) => {
                  return (
                    <List
                      autoHeight
                      height={height}
                      rowCount={id_list.length}
                      rowHeight={80}
                      rowRenderer={({ key, index, style }) => {
                        const uid = id_list[index];
                        const item = data[uid];
                        return (
                          <ListItem
                            key={key}
                            style={style}
                            section={section}
                            focusStats={focusStats}
                            item={item}
                          />
                        )
                      }}
                      scrollTop={scrollTop}
                      width={width}
                    />
                  );
                }}
              </AutoSizer>
            );
          }}
        </WindowScroller>
      </div>
    );
  }
}


StatsTable.propTypes = propTypes;
StatsTable.defaultProps = defaultProps;

const mapStateToProps = ({ focusStats, filters, stats }) => {
  return {
    focusStats,
    filters,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    //selectStats: (statsKey, item) => dispatch(),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StatsTable);