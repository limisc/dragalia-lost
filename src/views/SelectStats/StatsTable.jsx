// @flow
/* eslint-disable no-unused-vars */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  WindowScroller,
  AutoSizer,
  List,
} from 'react-virtualized';
import {
  adventurer_uid,
  weapon_uid,
  wyrmprint_uid,
  dragon_uid,
  adventurer,
  weapon,
  wyrmprint,
  dragon,
} from "data";
import {
  history,
  Context,
} from "store";
import ListItem from "./ListItem";


const propTypes = {

};

const defaultProps = {

};


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
        weapon: weapon_uid,
        wyrmprint: wyrmprint_uid,
        dragon: dragon_uid,
      },
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
                        section={section}
                        fields={fields}
                        focusStats={focusStats}
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

  onClick = (e) => {
    const { focusStats } = this.props;
    let { page, lang, stats } = this.context;
    stats = { ...stats, [focusStats]: e.target.id };
    const search = ["adventurer", "weapon", "wyrmprint1", "wyrmprint2", "dragon"].reduce((acc, cur) => {
      return !!stats[cur] ? `${acc}${cur}=${stats[cur]}&` : acc;
    }, "")

    history.replace(`/${page}/${lang}?${search}`);
  }
}

StatsTable.contextType = Context;
StatsTable.propTypes = propTypes;
StatsTable.defaultProps = defaultProps;

const mapStateToProps = ({ focusStats, section, filters }) => {
  return {
    focusStats,
    section,
    filters,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    //: () => dispatch(),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StatsTable);