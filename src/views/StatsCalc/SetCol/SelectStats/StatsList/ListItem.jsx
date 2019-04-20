//@flow
/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import { selectStats } from 'appRedux/actions';
import { Image, withTheme } from 'components';

class ListItem extends React.Component {
  render() {
    const {
      dir,
      lang,
      index,
      style,
      data: { list, fields },
    } = this.props;

    const item = list[index];

    let image;
    switch (dir) {
      case 'adventurer':
        image = item.id + item.rarity;
        break;
      case 'wyrmprint':
        image = item.id + '1';
        break;
      default:
        image = item.id;
        break;
    }

    const name = item.name[lang];
    return (
      <div style={style} className="list-item flex" onClick={this.onClick}>
        <div className="list-item-image">
          <Image dir={dir} image={image} />
        </div>

        <div className="list-item-name ellipsis">{name}</div>

        {fields.map(field => {
          if (field === 'weapon' || field === 'element') {
            const icon = `${field}_${item[field]}`;
            return (
              <div key={field} className="list-item-icon">
                <Image size="sm" dir="icon" image={icon} />
              </div>
            );
          }

          return (
            <div key={field} className="list-item-icon">
              {item[field]}
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

const mapStateToProps = ({ focusKey, dir }) => {
  return {
    focusKey,
    dir,
  };
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
