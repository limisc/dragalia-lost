import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SelectItem extends Component {
  constructor(props) {
    super(props);
    this._onClick = this._onClick.bind(this);
  }

  render() {
    const { IMG_PATH, section, filterField, status } = this.props;
    return (
      <tr>
        <td>
          <img
            className="selection-img"
            alt={status.Name}
            src={`${IMG_PATH}/${section}/${status.img}`}
            onClick={this._onClick}
          />
        </td>
        <td id="table-left-align">{status.Name}</td>
        {filterField.map((field, j) => <td key={j}>{status[field]}</td>)}
      </tr>
    );
  }

  shouldComponentUpdate(nextProps) {
    const { section, filterField, status } = this.props;
    return nextProps.section !== section || nextProps.filterField !== filterField || nextProps.status !== status;
  }

  _onClick() {
    this.props.handleSelection(this.props.status);
  }
}

SelectItem.propTypes = {
  IMG_PATH: PropTypes.string,
  section: PropTypes.string,
  filterField: PropTypes.array,
  status: PropTypes.object,
  handleSelection: PropTypes.func,
};

export default SelectItem;