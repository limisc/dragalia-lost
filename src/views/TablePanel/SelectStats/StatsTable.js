/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Paper } from '@material-ui/core';
import { AutoSizer, Table, Column } from 'react-virtualized';

import { adventurer, weapon, wyrmprint, dragon } from "data";
import { AppContext } from "context";
import { translate, getSection } from "actions";
import { Image } from "components";
import ListItem from "./ListItem";


const mapStateToProps = (state) => {
  const { focusSection, filters } = state;
  return {
    focusSection,
    filters,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {

  };
}

class StatsTable extends Component {

  state = {
    adventurer,
    weapon,
    wyrmprint,
    dragon,
  }

  _getRowClassName = ({ index }) => {
    return classNames("flex", { "hov": index !== -1 });
  }

  _buildColumns = (fields) => {
    const { lang } = this.context;
    const { focusSection } = this.props;
    const columns = [
      { dataKey: "image", label: translate(focusSection, lang), width: 100 },
      { dataKey: "Name", label: translate("name", lang), width: 120, flexGrow: 1 },
    ];

    for (const field of fields) {
      columns.push({
        dataKey: field,
        label: translate(field, lang),
        width: 80,
      });
    }
    return columns;
  }

  _filterData = (fields) => {
    const { focusSection, filters } = this.props;
    const section = getSection(focusSection);
    return this.state[section].filter(item => {
      for (const key of fields) {
        if (!item[key].includes(filters[key])) return false;
      }
      return true;
    }).sort((item1, item2) => {
      if (item1.rarity > item2.rarity) return -1;
      if (item1.rarity < item2.rarity) return 1;

      if (item1.tier) {
        // let tier1 = parseInt(item1.tier, 10), tier2 = parseInt(item2.tier, 10);
        if (item1.tier > item2.tier) return -1;
        if (item1.tier < item2.tier) return 1;
      }

      if (item1.element) {
        const element = ["Flame", "Water", "Wind", "Light", "Shadow"];
        const element1 = element.indexOf(item1.element),
          element2 = element.indexOf(item2.element);
        if (element1 > element2) return 1;
        if (element1 < element2) return -1;
      }

      if (item1.type) {
        const type = ["Sword", "Blade", "Dagger", "Axe", "Lance", "Bow", "Wand", "Staff"];
        const type1 = type.indexOf(item1.type),
          type2 = type.indexOf(item2.type);
        if (type1 > type2) return 1;
        if (type1 < type2) return -1;
      }

      if (item1.Id > item2.Id) return -1;
      if (item1.Id < item2.Id) return 1;
      return 0;
    });
  }


  _cellRenderer = ({ dataKey, cellData, rowData }) => {
    const { lang } = this.context;
    const { focusSection } = this.props;
    switch (dataKey) {
      case "image":
        return <ListItem statsKey={focusSection} item={rowData} />
      case "Name":
        return cellData[lang];
      case "type":
      case "element":
        const image = `${dataKey}_${cellData}`
        return <Image
          size="sm"
          statsKey="icon"
          image={image}
        />
      default:
        return cellData;
    }
  }


  render() {
    const {
      fields,
    } = this.props;

    const columns = this._buildColumns(fields);
    const data = this._filterData(fields);

    return (
      <Paper className="stats-table">
        <AutoSizer>
          {({ height, width }) => (
            <Table
              headerHeight={50}
              rowHeight={75}
              height={height}
              width={width}
              rowCount={data.length}
              rowGetter={({ index }) => data[index]}
              rowClassName={this._getRowClassName}
            >
              {columns.map(({ dataKey, ...rest }) =>
                <Column
                  key={dataKey}
                  dataKey={dataKey}
                  cellRenderer={this._cellRenderer}
                  {...rest}
                />
              )}
            </Table>
          )}
        </AutoSizer>
      </Paper>
    );
  }
}

StatsTable.contextType = AppContext;

StatsTable.propTypes = {
  fields: PropTypes.array,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StatsTable);