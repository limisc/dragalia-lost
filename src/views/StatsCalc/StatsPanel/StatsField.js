/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InputNumber from "./InputNumber";
import SelectItem from './SelectItem';
import {
  Grid,
  Paper,
  TextField
} from '@material-ui/core';
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
      <>
        <Grid item xs={6}>
          <InputNumber
            label="level"
            section={section}
          />
        </Grid>

        <Grid item xs={6}>
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
        </Grid>
        <Grid item xs={6}>
          {section === "adventurer" &&
            <SelectItem
              label="mana"
              section={section}
            />
          }
        </Grid>
      </>
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