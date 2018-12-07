import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleSelection } from '../../../redux/actions/actions';
import uuidv4 from 'uuid/v4';

const mapStateToProps = (state) => {
  // const { UIData: { IMG_PATH } } = state;
  return {
    // IMG_PATH,
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

    // this.getImg = this.getImg.bind(this);
    this._onClick = this._onClick.bind(this);
  }


  shouldComponentUpdate(nextProps) {
    const { section, status } = this.props;
    return nextProps.section !== section || nextProps.status !== status;
  }

  render() {
    const {
      // IMG_PATH,
      filterField, status } = this.props;
    return (
      <tr>
        <td>
          <img
            className="selection-avatar"
            alt={status.Name}
            src={this.getImg()}
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

  // getImg() {
  //   const { IMG_PATH, section, status: { img, Id, rarity } } = this.props;
  //   let img_name = "";
  //   switch (section) {
  //     case "adventurer": {
  //       img_name = `${Id}_r0${rarity}.png`;
  //       break;
  //     }
  //     case "wyrmprint": {
  //       img_name = `${Id}_01.png`;
  //       break;
  //     }
  //     default:
  //       img_name = img;
  //       break;
  //   }
  //   return `${IMG_PATH}/${section}/${img_name}`;
  // }

  _onClick() {
    const { section, status, onClick } = this.props;
    onClick(section, status);
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListItem);