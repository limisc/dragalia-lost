import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InputItem from './InputItem';
import MaxLVButton from './MaxLVButton';
import UnbindItem from './UnbindItem';
import SelectItem from './SelectItem';

const mapStateToProps = (state) => {
  const { statusSets } = state;
  return {
    statusSets
  };
}

class StatusFields extends Component {

  shouldComponentUpdate(nextProps) {
    //because for each statusField, section will not change except change coding layout.
    const { section } = nextProps;
    return nextProps.statusSets[section] !== this.props.statusSets[section];
  }

  render() {
    const { section } = this.props;
    console.log("StatusField", section)
    return (
      <div className="ui form">
        <div className="equal width fields">
          <InputItem
            label="level"
            section={section}
          />
          <MaxLVButton
            section={section}
          />
        </div>
        {section === "adventurer" ?
          <SelectItem />
          :
          <UnbindItem
            section={section}
          />
        }

      </div>
    );
  }
}

StatusFields.propTypes = {
  section: PropTypes.string.isRequired,
  statusSets: PropTypes.object.isRequired,
}
export default connect(
  mapStateToProps,
)(StatusFields);