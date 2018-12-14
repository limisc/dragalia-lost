import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InputItem from './statsFields/InputItem';
const mapStateToProps = (state) => {
  const { adventurer, dragon, halidom } = state.stats;
  return {
    adventurer,
    dragon,
    halidom
  };
}

class HalidomStats extends Component {
  render() {
    const { field, adventurer, dragon, halidom } = this.props;
    const item = field === "statue" ? dragon : adventurer;
    let type = "";
    if (item) {
      type = field === "statue" ? item.element : item[field];
    }

    return (
      <div className="row">
        {item &&
          <div className="ui two column grid">
            <div className="five wide column">
              <img
                className="halidom-icon"
                alt="halidom-icon"
                src={`${process.env.PUBLIC_URL}/image/icon/${field}_${type}.png`}
                onClick={this._onClick}
              />
            </div>
            <div className="ten wide column">
              <div className="ui form">
                <div className="two fields">
                  <InputItem
                    section="halidom"
                    field={field}
                    label="HP"
                  />

                  <InputItem
                    section="halidom"
                    field={field}
                    label="STR"
                  />
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

HalidomStats.propTypes = {
  field: PropTypes.string.isRequired,
}

export default connect(
  mapStateToProps,
)(HalidomStats);