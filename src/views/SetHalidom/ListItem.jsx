// @flow
/* eslint-disable no-unused-vars */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Grid,
  Typography,
} from '@material-ui/core';
import names from "intl/facility";
import {
  getLimit,
  getValue,
  newFacility,
  updateFacility,
} from "actions";
import { Image } from "components";
import { values } from "data/facility";
import Slider from './Slider';

const propTypes = {
  lang: PropTypes.string,
  facility: PropTypes.object.isRequired,
};

class ListItem extends Component {
  constructor(props) {
    super(props);
    const {
      index,
      facilityType,
      facility: { type },
      newFacility,
      updateFacility,
    } = props;

    const max = getLimit(type);
    this.state = {
      max,
      type,
      index,
      facilityType,
      level: max,
    };
    this.onChange = this.onChange.bind(this);
    this.levelDecrement = this.levelDecrement.bind(this);
    this.levelIncrement = this.levelIncrement.bind(this);

    const value = getValue(type, max);
    if (index === 0) {
      newFacility(facilityType, index, value);
    } else {
      updateFacility(facilityType, index, value);
    }
  }

  render() {
    const {
      facility,
      lang,
    } = this.props;

    const {
      level,
      max,
    } = this.state;
    const { id, image } = facility;
    const name = names[id][lang] || names[id].en;
    return (
      <Grid container className="halidom-list">
        <Grid
          container
          item xs={4} md={2}
          justify="center"
          alignItems="center"
        >
          <Image
            size="lg"
            statsKey="facility"
            image={image}
          />
        </Grid>

        <Grid
          container
          item xs={4} md={3}
          justify="center"
          alignItems="center"
        >
          <Typography noWrap>
            {name}
          </Typography>
        </Grid>

        <Grid
          container
          item xs={4} md={1}
          justify="center"
          alignItems="center"
        >
          {level}
        </Grid>

        <Grid
          container
          item xs={4} md={1}
          justify="center"
          alignItems="center"
          style={{ height: "80px" }}
        >
          <Image
            size="sm"
            statsKey="icon"
            image="minus"
            onClick={this.levelDecrement}
          />
        </Grid>


        <Grid
          container
          item xs={4} md={4}
          justify="center"
          alignItems="center"
        >
          <Slider
            level={level}
            max={max}
            onChange={this.onChange}
          />
        </Grid>

        <Grid
          container
          item xs={4} md={1}
          justify="center"
          alignItems="center"
        >
          <Image
            size="sm"
            statsKey="icon"
            image="plus"
            onClick={this.levelIncrement}
          />
        </Grid>
      </Grid>
    );
  }

  onChange = ({ target: { value } }) => {
    let {
      type,
      index,
      timerId,
      facilityType,
    } = this.state;

    const newValue = this.getValue(type, value);
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      this.props.updateFacility(facilityType, index, newValue);
    }, 500);
    this.setState({
      timerId,
      level: value,
    });
  }

  levelDecrement = () => {
    const {
      type,
      index,
      level,
      facilityType,
    } = this.state;

    const intLevel = (parseInt(level, 10) || 0) - 1;
    if (intLevel >= 0) {
      const newValue = this.getValue(type, intLevel);
      this.props.updateFacility(facilityType, index, newValue);
      this.setState({ level: intLevel });
    }
  }
  levelIncrement = () => {
    const {
      max,
      type,
      index,
      level,
      facilityType,
    } = this.state;

    const intLevel = (parseInt(level, 10) || 0) + 1;
    if (intLevel <= max) {
      const newValue = getValue(type, intLevel);
      this.props.updateFacility(facilityType, index, newValue);
      this.setState({ level: intLevel });
    }
  }
}


ListItem.propTypes = propTypes;

const mapDispatchToProps = (dispatch) => {
  return {
    newFacility: (facilityType, key, value) => dispatch(newFacility(facilityType, key, value)),
    updateFacility: (facilityType, key, value) => dispatch(updateFacility(facilityType, key, value)),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(ListItem);