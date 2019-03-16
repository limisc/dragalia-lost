// @flow
/* eslint-disable no-unused-vars */
import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Typography,
} from '@material-ui/core';
import { Image } from "components";
import { selectStats } from "actions";

const propTypes = {
  section: PropTypes.string,
};

class ListItem extends PureComponent {

  render() {
    const {
      index,
      style,
      section,
      data: {
        list,
        fields,
        lang = "ja",
      },
    } = this.props;

    const item = list[index];

    let image = "add";
    switch (section) {
      case "adventurer":
        image = item.id + item.rarity;
        break;
      case "wyrmprint":
        image = item.id + "1";
        break;
      default:
        image = item.id;
        break;
    }

    const name = item.name[lang];
    return (
      <div
        className="stats-list"
        style={style}
        onClick={this.onClick}
      >
        <div className="stats-list-image">
          <Image
            statsKey={section}
            image={image}
          />
        </div>

        <div className="stats-list-name">
          <Typography noWrap>
            {name}
          </Typography>
        </div>

        {fields.map((field) => {
          if (field === "weapon" || field === "element") {
            const icon = `${field}_${item[field]}`;
            return (
              <div key={field} className="stats-list-icon">
                <Image
                  statsKey="icon"
                  size="sm"
                  image={icon}
                />
              </div>
            );
          }

          return (
            <div key={field} className="stats-list-icon">
              {item[field]}
            </div>
          );
        })}
      </div>
    );
  }

  itemKey = (index, data) => {
    const { list } = data;
    const item = list[index];

    return item.id;
  }

  onClick = () => {
    const {
      index,
      focusKey,
      selectStats,
      data: { list: { [index]: item } },
    } = this.props;
    selectStats(focusKey, item);
  }
}

ListItem.propTypes = propTypes;

const mapStateToProps = ({ focusKey, section }) => {
  return {
    focusKey,
    section,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectStats: (statsKey, item) => dispatch(selectStats(statsKey, item)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListItem);