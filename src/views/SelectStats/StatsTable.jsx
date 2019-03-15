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
import { SetHalidom } from "views"

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
  }

  render() {
    const {
      section,
      filters,
      fields,
      match: { params: { lang = "en" } },
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
                // <List
                //   autoHeight
                //   height={height}
                //   rowCount={idList.length}
                //   rowHeight={80}
                //   rowRenderer={({ key, index, style }) => {
                //     const uid = idList[index];
                //     const item = data[uid];
                //     if (item) {
                //       return (
                //         <ListItem
                //           key={key}
                //           style={style}
                //           fields={fields}
                //           item={item}
                //           lang={lang}
                //           onClick={this.onClick}
                //         />
                //       )
                //     }
                //   }}
                //   scrollTop={scrollTop}
                //   width={width}
                // />
                <div style={{ width: width }}>
                  <SetHalidom />
                  <SetHalidom />
                  <SetHalidom />
                </div>
              )}
            </AutoSizer>
          )}
        </WindowScroller>
      </div>
    );
  }
}

StatsTable.propTypes = propTypes;
StatsTable.defaultProps = defaultProps;

const mapStateToProps = ({
  focusStats,
  section,
  filters,
  stats,
}) => {
  return {
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