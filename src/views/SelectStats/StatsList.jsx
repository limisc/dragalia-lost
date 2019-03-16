// @flow
/* eslint-disable no-unused-vars */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FixedSizeList } from "react-window";
import AutoSizer from 'react-virtualized-auto-sizer';
import dataList from "data";
import ListItem from "./ListItem";
const propTypes = {

};

const defaultProps = {

};


class StatsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: dataList,
    };
  }

  render() {
    const {
      fields,
      list,
    } = this.props;

    return (
      <AutoSizer>
        {({ height, width }) => (
          <FixedSizeList
            height={height}
            width={width}
            itemCount={list.length}
            itemSize={80}
            itemData={{
              list,
              fields,
            }}
          >
            {ListItem}
          </FixedSizeList>
        )}
      </AutoSizer>
    );
  }
}


StatsList.propTypes = propTypes;
StatsList.defaultProps = defaultProps;

const mapStateToProps = ({
  focusKey,
  section,
  filters,
}, props) => {

  //generate filtered list here,
  const list = dataList[section];
  return {
    list,
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
)(StatsList);