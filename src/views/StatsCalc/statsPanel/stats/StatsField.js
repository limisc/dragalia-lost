import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InputItem from './InputItem';
import SelectItem from './SelectItem';

const mapStateToProps = (state) => {
  return {

  };
}

const mapDispatchToProps = (dispatch) => {
  return {

  };
}

class StatsField extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const { section } = this.props;
    return (
      <div className="ten wide column">
        <div className="ui form">
          <div className="two fields">
            <InputItem
              label="level"
              section={section}
            />
            {section === "adventurer" ?
              <SelectItem
                label="curRarity"
                section={section}
              />
              :
              <SelectItem
                label="unbind"
                section={section}
              />
            }
          </div>
          {section === "adventurer" &&
            <div className="two fields">
              <SelectItem
                label="mana"
                section={section}
              />
              {/* {this.props.stats[section] &&
              <div className="field">
                <label>EX</label>
                <input disabled value={"DEV..."}/>
              </div>
            } */}
            </div>
          }
        </div>
      </div>
    );
  }
}


StatsField.propTypes = {
  section: PropTypes.string.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StatsField);