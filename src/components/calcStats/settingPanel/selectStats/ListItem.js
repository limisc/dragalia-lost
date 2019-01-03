import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import StatsName from '../../statsPanel/stats/StatsName';
import SmallIcon from './SmallIcon';

import { selectStats } from "../../../../redux/actions/actions";

const mapStateToProps = (state) => {
  return {

  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectStats: (section, item) => dispatch(selectStats(section, item)),
  };
}

class ListItem extends Component {
  constructor(props) {
    super(props);
    this._onClick = this._onClick.bind(this);
  }

  render() {
    const { section, filterField, item } = this.props;
    const { Id, Name, image } = item;
    return (
      <tr>
        <td>
          <img
            className="m"
            alt={Id}
            src={`${process.env.PUBLIC_URL}/image/${section}/${image}`}
            onClick={this._onClick}
          />
        </td>
        <td><StatsName section={section} name={Name} /></td>
        {filterField.map((field, i) => {
          if (field === "element" || field === "type") {
            const image = `${field}_${item[field]}.png`
            return (
              <td key={i}>
                <SmallIcon image={image} />
              </td>
            )
          }
          return <td key={i}>{item[field]}</td>;
        })}
      </tr>
    );
  }

  _onClick = () => {
    const { section, item, selectStats } = this.props;
    selectStats(section, item);
  }
}


ListItem.propTypes = {
  section: PropTypes.string.isRequired,
  filterField: PropTypes.array.isRequired,
  item: PropTypes.object.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListItem);