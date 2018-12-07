import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';
import { handleSelection } from '../../../redux/actions/actions';
function mapStateToProps(state) {
  return {

  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (section, status) => dispatch(handleSelection(section, status)),
  }
}

class ListItem extends Component {
  constructor(props) {
    super(props);
    this._onClick = this._onClick.bind(this);
    this.getImagePath = this.getImagePath.bind(this);

  }

  render() {
    const { status, filterField } = this.props;
    return (
      <tr>
        <td>
          <img
            className="selection-avatar"
            alt={status.Name}
            src={this.getImagePath()}
            onClick={this._onClick}
          />
        </td>
        <td id="table-left-align">{status.Name}</td>
        {filterField.map((field) => {
          // if (field === "element" || field === "type") {
          //   return (
          //     <td key={uuidv4()}>
          //       <img
          //         className="selection-icon"
          //         alt={status[field]}
          //         src={`${IMG_PATH}/icon/icon_${field}_${status[field]}.png`}
          //       />
          //     </td>
          //   )
          // }
          return <td key={uuidv4()}>{status[field]}</td>;
        })}
      </tr>
    );
  }

  _onClick() {
    const { section, status, onClick } = this.props;
    onClick(section, status)
  }

  getImagePath() {
    const { section, status: { img, Id, rarity } } = this.props;
    let img_name = "";
    switch (section) {
      case "adventurer": {
        img_name = `${Id}_r0${rarity}.png`;
        break;
      }
      case "wyrmprint": {
        img_name = `${Id}_01.png`;
        break;
      }
      default:
        img_name = img;
        break;
    }
    return `${process.env.PUBLIC_URL}/img/${section}/${img_name}`;
  }
}

ListItem.propTypes = {
  section: PropTypes.string.isRequired,
  status: PropTypes.object.isRequired,
  filterField: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func.isRequired,
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListItem);