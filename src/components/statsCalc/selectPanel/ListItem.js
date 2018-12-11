import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';
import { handleSelection } from '../../../redux/actions/actions';

const mapStateToProps = (state) => {
  return {

  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (section, item) => dispatch(handleSelection(section, item)),
  }
}

class ListItem extends Component {
  constructor(props) {
    super(props);
    this._onClick = this._onClick.bind(this);
  }

  render() {
    const { section, stats, filterField } = this.props;
    return (
      <tr>
        <td>
          <img
            className="selection-avatar"
            alt={stats.Name["zh"]}
            src={`${process.env.PUBLIC_URL}/image/${section}/${stats.image}`}
            onClick={this._onClick}
          />
        </td>
        <td id="table-left-align">{stats.Name["zh"]}</td>
        {filterField.map((field) => {
          if (field === "element" || field === "weaponType") {
            return (
              <td key={uuidv4()}>
                <img
                  className="selection-icon"
                  alt={stats[field]}
                  src={`${process.env.PUBLIC_URL}/image/icon/icon_${field}_${stats[field]}.png`}
                />
              </td>
            )
          }
          return <td key={uuidv4()}>{stats[field]}</td>;
        })}
      </tr>
    );
  }

  _onClick() {
    const { section, item, onClick } = this.props;
    onClick(section, item)
  }
}

ListItem.propTypes = {
  section: PropTypes.string.isRequired,
  stats: PropTypes.object.isRequired,
  filterField: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func.isRequired,
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListItem);