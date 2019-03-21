// @flow

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { TextField } from '@material-ui/core';
import { FixedSizeList } from "react-window";
import AutoSizer from 'react-virtualized-auto-sizer';
import { translate } from "actions";
import dataList from "data";
import ListHeader from "./ListHeader";
import ListItem from "./ListItem";
class StatsList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      element: ["Flame", "Water", "Wind", "Light", "Shadow"],
      weapon: ["Sword", "Blade", "Dagger", "Axe", "Lance", "Bow", "Wand", "Staff"],
      search: "",
    };
  }

  render() {
    const {
      lang,
      fields,
      filters,
      section,
    } = this.props;

    const {
      element,
      weapon,
      search,
    } = this.state;

    let list = dataList[section];
    list = list.filter((item) => {
      for (let k of fields) {
        if (!item[k].includes(filters[k])) {
          return false;
        }
      }

      if (!item.name[lang].toUpperCase().includes(search.toUpperCase())) {
        return false;
      }

      return true;
    }).sort((item1, item2) => {
      if (item1.rarity > item2.rarity) return -1;
      if (item1.rarity < item2.rarity) return 1;

      if (item1.tier) {
        if (item1.tier > item2.tier) return -1;
        if (item1.tier < item2.tier) return 1;
      }

      if (item1.element) {
        const element1 = element.indexOf(item1.element),
          element2 = element.indexOf(item2.element);
        if (element1 > element2) return 1;
        if (element1 < element2) return -1;
      }

      if (item1.weapon) {
        const weapon1 = weapon.indexOf(item1.weapon),
          weapon2 = weapon.indexOf(item2.weapon);
        if (weapon1 > weapon2) return 1;
        if (weapon1 < weapon2) return -1;
      }

      if (item1.id > item2.id) return -1;
      if (item1.id < item2.id) return 1;
      return 0;
    });
    return (
      <div style={{ height: "calc(100vh - 290px)" }}>
        <TextField
          value={search}
          className="filters"
          label={translate("search", lang)}
          onChange={this.onChange}
          inputProps={{
            name: "search",
          }}
          variant="filled"
        />
        <ListHeader
          lang={lang}
          fields={fields}
        />
        <AutoSizer>
          {({ height, width }) => (
            <FixedSizeList
              height={height}
              width={width}
              itemSize={80}
              itemCount={list.length}
              itemData={{
                list,
                lang,
                fields,
              }}
            >
              {ListItem}
            </FixedSizeList>
          )}
        </AutoSizer>
      </div>
    );
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });
}

const mapStateToProps = ({
  section,
  filters,
}) => {
  return {
    section,
    filters,
  };
}

export default connect(
  mapStateToProps,
)(StatsList);