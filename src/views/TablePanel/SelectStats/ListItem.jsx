// @flow
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Image } from "components";
import { selectStats } from "actions";

const propTypes = {
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
      <div style={style} className="flex">
        <div className="lg center">
          <Image
            size="md"
            statsKey={section}
            image={image}
            onClick={this.onClick}
          />
        </div>

        <span className="list-name">
          {item.Name["en"]}
        </span>

        {this.state[section].map((field) => {
          switch (field) {
            case "type":
            case "element":
              const icon = `${field}_${item[field]}`;
              return (
                <div key={field} className="list-rest">
                  <Image
                    size="sm"
                    statsKey="icon"
                    image={icon}
                  />
                </div>
              );
            default:
              return (
                <span key={field} className="list-rest">
                  {item[field]}
                </span>
              );
          }
        })}
      </div>
    );
  }

  onClick = () => {
    const { focusStats, item, selectStats } = this.props;
    selectStats(focusStats, item);
  }
}

ListItem.propTypes = propTypes;

const mapStateToProps = (state) => {
  return {

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