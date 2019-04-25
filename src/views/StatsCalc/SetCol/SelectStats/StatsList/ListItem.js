/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import { selectStats } from 'actions';
import { Image, withTheme } from 'components';

class ListItem extends React.Component {
  render() {
    const {
      field,
      lang,
      index,
      style,
      data: { list, fields },
    } = this.props;

    const item = list[index];
    const name = item.name[lang];
    const { id, rarity } = item;
    let image;
    if (field === 'adventurer') {
      image = `${id}_r0${rarity}`;
    } else if (field === 'wyrmprint') {
      image = `${id}_01`;
    } else {
      image = id;
    }

    return (
      <div style={style} className="list-item flex" onClick={this.onClick}>
        <div className="list-item-image">
          <Image field={field} image={image} />
        </div>

        <div className="list-item-name ellipsis">{name}</div>

        {fields.map(f => {
          if (f === 'weapon' || f === 'element') {
            const icon = `${f}_${item[f]}`;
            return (
              <div key={f} className="list-item-icon">
                <Image size="sm" field="icon" image={icon} />
              </div>
            );
          }

          return (
            <div key={f} className="list-item-icon">
              {item[f]}
            </div>
          );
        })}
      </div>
    );
  }

  onClick = () => {
    const {
      index,
      focusKey,
      selectStats,
      data: {
        list: { [index]: item },
      },
    } = this.props;

    selectStats(focusKey, item);
  };
}

const mapStateToProps = ({ focusKey, field }) => {
  return { focusKey, field };
};

const mapDispatchToProps = dispatch => {
  return {
    selectStats: (statsKey, item) => dispatch(selectStats(statsKey, item)),
  };
};

export default withTheme(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ListItem)
);
