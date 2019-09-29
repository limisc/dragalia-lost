import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import content, { ELEMENTS, WEAPONS } from 'data';
import { makeFilters } from 'utils/filters';
import { Context } from 'components';
import ListItem from './ListItem';

function StatsList({ field, fields, filters, search }) {
  const { lang } = React.useContext(Context);

  const [hide, setHide] = React.useState('hide');

  useEffect(() => {
    setTimeout(() => {
      setHide(null);
    }, 250);
  }, []);

  const itemData = React.useMemo(() => {
    const compare = (item1, item2) => {
      if (item1.rarity > item2.rarity) return -1;
      if (item1.rarity < item2.rarity) return 1;

      if (item1.element) {
        const element = [...ELEMENTS, 'None'];
        const element1 = element.indexOf(item1.element);
        const element2 = element.indexOf(item2.element);
        if (element1 > element2) return 1;
        if (element1 < element2) return -1;
      }

      if (item1.weapon) {
        const weapon1 = WEAPONS.indexOf(item1.weapon);
        const weapon2 = WEAPONS.indexOf(item2.weapon);
        if (weapon1 > weapon2) return 1;
        if (weapon1 < weapon2) return -1;
      }

      if (field === 'wyrmprint') {
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

    const filtersDerived = {};
    fields.forEach(name => {
      filtersDerived[name] = makeFilters({ arr: filters[name], name });
    });

    const arr = Object.values(content[field])
      .filter(item => {
        return (
          fields.every(f => filtersDerived[f].includes(item[f])) &&
          item.name[lang].toUpperCase().includes(search.toUpperCase())
        );
      })
      .sort(compare);

    const cols = fields;
    return { arr, cols, field };
  }, [field, fields, filters, lang, search]);

  const listRef = React.useRef(null);
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollToItem(0);
    }
  }, [field, filters]);

  return (
    <div className={hide}>
      <AutoSizer>
        {({ height, width }) => (
          <FixedSizeList
            ref={listRef}
            height={height}
            width={width}
            itemSize={80}
            itemCount={itemData.arr.length}
            itemData={itemData}
          >
            {ListItem}
          </FixedSizeList>
        )}
      </AutoSizer>
    </div>
  );
}

const mapStateToProps = ({ filters }) => {
  return { filters };
};

export default connect(mapStateToProps)(StatsList);
