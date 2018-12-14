import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';
import { handleSelection } from '../../../redux/actions/actions';

const mapStateToProps = (state) => {
  return {
    language: state.language,
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
    const { language, section, item, filterField } = this.props;
    return (
      <tr>
        <td>
          <img
            className="selection-avatar"
            alt={item.Name[language]}
            src={`${process.env.PUBLIC_URL}/image/${section}/${item.image}`}
            onClick={this._onClick}
          />
        </td>
        <td id="table-left-align">{item.Name[language]}</td>
        {filterField.map((field) => {
          if (field === "element" || field === "weaponType") {
            return (
              <td key={uuidv4()}>
                <img
                  className="selection-icon"
                  alt={item[field]}
                  src={`${process.env.PUBLIC_URL}/image/icon/${field}_${item[field]}.png`}
                />
              </td>
            )
          }
          return <td key={uuidv4()}>{item[field]}</td>;
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
  item: PropTypes.object.isRequired,
  filterField: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func.isRequired,
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListItem);