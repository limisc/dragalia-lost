// @flow
/* eslint-disable no-unused-vars */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  WindowScroller,
  AutoSizer,
  List,
} from 'react-virtualized';
import {
  data,
  uid,
} from "data";
import {
  history,
} from "store";
import {
  selectStats,
} from "actions";
import ListItem from "./ListItem";


const propTypes = {

};

const defaultProps = {

};


class StatsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data,
      uid,
    };

    this.onClick = this.onClick.bind(this);
  }

  render() {
    const {
      focusStats,
      section,
      filters,
      fields,
    } = this.props;

    const {
      data: { [section]: data },
      uid: { [section]: idList },
    } = this.state;

    return (
      <div
        style={{
          flex: 1,
        }}
      >
        <WindowScroller>
          {({ height, scrollTop }) => (
            <AutoSizer disableHeight>
              {({ width }) => (
                <List
                  autoHeight
                  height={height}
                  rowCount={idList.length}
                  rowHeight={80}
                  rowRenderer={({ key, index, style }) => {
                    const uid = idList[index];
                    const item = data[uid];
                    return (
                      <ListItem
                        key={key}
                        style={style}
                        // section={section}
                        fields={fields}
                        // focusStats={focusStats}
                        item={item}
                        onClick={this.onClick}
                      />
                    )
                  }}
                  scrollTop={scrollTop}
                  width={width}
                />
              )}
            </AutoSizer>
          )}
        </WindowScroller>
      </div>
    );
  }

  onClick = () => {
    const {
      statsFields,
      stats,
      match: {
        params: { lang = "en", page = "stats_calc" },
      },
    } = this.props;
    console.log(stats)
    const search = statsFields.reduce((acc, statsKey) => {
      return !!stats[statsKey] ? `${acc}${statsKey}=${stats[statsKey].Id}&` : acc;
    });
    history.push(`${lang}?${search}`);
  }
}

StatsTable.propTypes = propTypes;
StatsTable.defaultProps = defaultProps;

const mapStateToProps = ({
  statsFields,
  focusStats,
  section,
  filters,
  stats,
}) => {
  return {
    statsFields,
    focusStats,
    section,
    filters,
    stats,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectStats: (statsKey, item) => dispatch(selectStats(statsKey, item)),
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(StatsTable));