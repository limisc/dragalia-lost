/* eslint-disable no-unused-vars */
import React, { Fragment, createRef } from 'react';
import { connect } from 'react-redux';
import { FixedSizeList } from 'react-window';
import { withTheme } from 'components';
import AutoSizer from 'react-virtualized-auto-sizer';
import dataList from 'data';
import ListHeader from './ListHeader';
import ListItem from './ListItem';

class StatsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      element: ['Flame', 'Water', 'Wind', 'Light', 'Shadow', 'None'],
      weapon: [
        'Sword',
        'Blade',
        'Dagger',
        'Axe',
        'Lance',
        'Bow',
        'Wand',
        'Staff',
      ],
      scroll: false,
      listRef: createRef(),
    };
  }

  getSnapshotBeforeUpdate(prevProps) {
    if (prevProps !== this.props) {
      return true;
    }

    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot) {
      this.state.listRef.current.scrollToItem(0);
    }
  }

  compare = (item1, item2) => {
    let { element, weapon } = this.state;

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

    if (this.props.field === 'wyrmprint') {
      if (item1.dungeon && !item2.dungeon) return -1;
      if (!item1.dungeon && item2.dungeon) return 1;

      if (
        item1.MaxAtk +
          item1.MaxHp +
          item1.abilities13 +
          item1.abilities23 +
          item1.abilities33 >
        item2.MaxAtk +
          item2.MaxHp +
          item2.abilities13 +
          item2.abilities23 +
          item2.abilities33
      ) {
        return -1;
      }

      if (
        item1.MaxAtk +
          item1.MaxHp +
          item1.abilities13 +
          item1.abilities23 +
          item1.abilities33 <
        item2.MaxAtk +
          item2.MaxHp +
          item2.abilities13 +
          item2.abilities23 +
          item2.abilities33
      ) {
        return 1;
      }
    } else {
      if (item1.MaxAtk + item1.MaxHp > item2.MaxAtk + item2.MaxHp) return -1;
      if (item1.MaxAtk + item1.MaxHp < item2.MaxAtk + item2.MaxHp) return 1;
    }

    if (item1.id > item2.id) return 1;
    if (item1.id < item2.id) return -1;

    return 0;
  };

  render() {
    let { lang, field, fields, filters, search } = this.props;
    let list = dataList[field];

    if (list) {
      list = list
        .filter(item => {
          for (let f of fields) {
            if (item[f].indexOf(filters[f]) === -1) {
              return false;
            }
          }

          return (
            item.name[lang].toUpperCase().indexOf(search.toUpperCase()) !== -1
          );
        })
        .sort(this.compare);
    }

    if (field === 'weapon') {
      fields = ['weapon', 'element', 'rarity'];
    }

    return (
      <Fragment>
        <ListHeader fields={fields} />
        <div className="fill-remains">
          <AutoSizer>
            {({ height, width }) => (
              <FixedSizeList
                ref={this.state.listRef}
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
}

StatsList.defaultProps = {
  lang: 'en',
};

const mapStateToProps = ({ field, filters }) => {
  return { field, filters };
};

export default withTheme(connect(mapStateToProps)(StatsList));
