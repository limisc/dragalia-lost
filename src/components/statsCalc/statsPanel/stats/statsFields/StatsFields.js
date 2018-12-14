import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InputItem from './InputItem';
import SelectItem from './SelectItem';

const mapStateToProps = (state) => {
  return {
    stats: state.stats,
  };
}

class StatsFields extends Component {

  // shouldComponentUpdate(nextProps) {
  //   //because for each statusField, section will not change except change coding layout.
  //   const { section } = nextProps;
  //   return nextProps.statusSets[section] !== this.props.statusSets[section];
  // }


  render() {
    const { section } = this.props;
    // console.log("StatusField", section)
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
              {this.props.stats[section] &&
                <div className="field">
                  <label>EX</label>
                  <input disabled value={"DEV..."}/>
                </div>
              }
            </div>
          }
        </div>
      </div>
    );
  }
}

StatsFields.propTypes = {
  section: PropTypes.string.isRequired,
  stats: PropTypes.object.isRequired,
}
export default connect(
  mapStateToProps,
)(StatsFields);