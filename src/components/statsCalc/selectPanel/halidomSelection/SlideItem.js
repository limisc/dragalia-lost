import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateHalidom } from '../../../../redux/actions/actions';

const mapStateToProps = (state) => {
  return {
    language: state.language,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (field, index, level) => dispatch(updateHalidom(field, index, level)),
  }
}

class SlideItem extends Component {
  constructor(props) {
    super(props);
    this.state = { image_path: `${process.env.PUBLIC_URL}/image` }
    this._onChange = this._onChange.bind(this);
    this.levelDecrement = this.levelDecrement.bind(this);
    this.levelIncrement = this.levelIncrement.bind(this);
  }

  render() {
    const { item, language } = this.props;
    const { image_path } = this.state;
    return (
      <tr>
        <td>
          <img
            className="selection-avatar"
            alt={item.image}
            src={`${image_path}/facility/${item.image}`}
          />
        </td>
        <td className="table-left-align">{item.name[language]}</td>
        <td>{item.level}</td>
        <td>
          <div className="row">
            <img
              alt="minus.png"
              src={`${image_path}/icon/minus.png`}
              onClick={this.levelDecrement}
              style={{ display: "inline-block", verticalAlign: "middle", marginRight: "10px" }}
            />
            <input
              className="slider"
              type="range"
              min="0" max="30" step="1"
              value={item.level}
              onChange={this._onChange}
            />
            <img
              alt="plus.png"
              src={`${image_path}/icon/plus.png`}
              onClick={this.levelIncrement}
              style={{ display: "inline-block", verticalAlign: "middle", marginLeft: "10px" }}
            />
          </div>
        </td>
      </tr>

    );
  }

  levelDecrement() {
    const { field, index, item: { level }, onChange } = this.props;
    const value = parseInt(level, 10);
    if (value > 0) {
      onChange(field, index, value - 1);
    }
  }

  levelIncrement() {
    const { field, index, item: { level }, onChange } = this.props;
    const value = parseInt(level, 10);
    if (value < 30) {
      onChange(field, index, value + 1);
    }
  }

  _onChange(e) {
    const { field, index, onChange } = this.props;
    onChange(field, index, e.target.value);
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SlideItem);