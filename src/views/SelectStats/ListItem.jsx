// @flow
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Image } from "components";
import { selectStats } from "actions";

const propTypes = {
  fields: PropTypes.array.isRequired,
  section: PropTypes.string.isRequired,
  item: PropTypes.object,
};

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adventurer: ["type", "element", "rarity"],
      weapon: ["type", "rarity", "tier"],
      wyrmprint: ["rarity"],
      dragon: ["element", "rarity"],
    };

    this.onClick = this.onClick.bind(this);
  }

  render() {
    const {
      style,
      section,
      item,
      fields,
      lang,
    } = this.props;

    let image = "add";
    if (item) {
      switch (section) {
        case "adventurer":
          image = item.Id + item.rarity;
          break;
        case "wyrmprint":
          image = item.Id + "1";
          break;
        default:
          image = item.Id;
          break;
      }
    }

    return (
      <div style={style} className="flex stats-list" onClick={this.onClick}>
        <div className="stats-list-img">
          <Image
            size="md"
            statsKey={section}
            image={image}
          />
        </div>

        <span className="stats-list-name">
          {item.Name[lang]}
        </span>

        {fields.map((field) => {
          if (field === "type" || field === "element") {
            const icon = `${field}_${item[field]}`;
            return (
              <div key={field} className="stats-list-icon">
                <Image
                  size="sm"
                  statsKey="icon"
                  image={icon}
                />
              </div>
            );
          } else {
            return (
              <span key={field} className="stats-list-icon">
                {item[field]}
              </span>
            );
          }
        })}
      </div>
    );
  }

  onClick = () => {
    const {
      focusKey,
      item,
      selectStats,
    } = this.props;

    selectStats(focusKey, item);
  }
}

ListItem.propTypes = propTypes;

const mapStateToProps = ({
  focusKey,
  section,
  stats,
}) => {
  return {
    focusKey,
    section,
    stats,
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