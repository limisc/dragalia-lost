//@flow
/* eslint-disable no-unused-vars */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { FixedSizeList } from 'react-window';
import { TextField } from '@material-ui/core';
import { translate } from 'appRedux/actions';
import { withTheme } from 'components';
import AutoSizer from 'react-virtualized-auto-sizer';
import dataList from 'data/dataList';
import ListHeader from './ListHeader';
import ListItem from './ListItem';
import { refs } from 'appRedux/store';

class StatsList extends React.Component {
  state = {
    search: '',
    element: ['Flame', 'Water', 'Wind', 'Light', 'Shadow', 'None'],
    weapon: ['Sword', 'Blade', 'Dagger', 'Axe', 'Lance', 'Bow', 'Wand', 'Staff'],
  };

  componentDidMount() {
    const { dir } = this.props;
    const list = dataList[dir];
    this.setState({ list });
  }

  render() {
    let { list, search, element, weapon } = this.state;
    const { lang, fields, filters } = this.props;

    if (list) {
      list = list
        .filter(item => {
          for (let f of fields) {
            if (item[f].indexOf(filters[f]) === -1) {
              return false;
            }
          }

          return item.name[lang].toUpperCase().indexOf(search.toUpperCase()) !== -1;
        })
        .sort((item1, item2) => {
          if (item1.rarity > item2.rarity) return -1;
          if (item1.rarity < item2.rarity) return 1;

          if (item1.element) {
            const element1 = element.indexOf(item1.element);
            const element2 = element.indexOf(item2.element);
            if (element1 > element2) return 1;
            if (element1 < element2) return -1;
          }

          if (item1.weapon) {
            const weapon1 = weapon.indexOf(item1.weapon);
            const weapon2 = weapon.indexOf(item2.weapon);
            if (weapon1 > weapon2) return 1;
            if (weapon1 < weapon2) return -1;
          }

          if (item1.MaxAtk + item1.MaxHp > item2.MaxAtk + item2.MaxHp) return -1;
          if (item1.MaxAtk + item1.MaxHp < item2.MaxAtk + item2.MaxHp) return 1;

          if (item1.id > item2.id) return -1;
          if (item1.id < item2.id) return 1;

          return 0;
        });
    }
    return (
      <Fragment>
        <TextField
          className="fluid"
          variant="filled"
          value={search}
          label={translate('search', lang)}
          onChange={this.onChange}
        />
        <ListHeader fields={fields} />
        <div id="stats-list" ref={refs.statsList}>
          <AutoSizer>
            {({ height, width }) => (
              <FixedSizeList
                height={height}
                width={width}
                itemSize={80}
                itemCount={list.length}
                itemData={{
                  list,
                  fields,
                }}
              >
                {ListItem}
              </FixedSizeList>
            )}
          </AutoSizer>
        </div>
      </Fragment>
    );
  }

  onChange = e => this.setState({ search: e.target.value });
}

const mapStateToProps = ({ dir, filters }) => {
  return {
    dir,
    filters,
  };
};

export default withTheme(connect(mapStateToProps)(StatsList));
