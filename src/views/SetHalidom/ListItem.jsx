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
  updateFacility,
} from "actions";
import { Image } from "components";
import Slider from './Slider';

const propTypes = {
  lang: PropTypes.string,
  facility: PropTypes.object.isRequired,
};

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level: 30,
      max: 30,
    };
    this.onChange = this.onChange.bind(this);
    this.levelDecrement = this.levelDecrement.bind(this);
    this.levelIncrement = this.levelIncrement.bind(this);
  }

  componentDidMount() {
    const {
      index,
      field,
      facility: { type },
      updateFacility,
    } = this.props;
    const max = getLimit(type);

    updateFacility(field, type, index, max);
    this.setState({
      max,
      type,
      level: max,
    });
  }

  render() {
    const {
      facility,
      // lang,
      lang = "en",
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
    const {
      index,
      field,
      updateFacility,
    } = this.props;

    let {
      type,
      timerId,
    } = this.state;
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      updateFacility(field, type, index, value);
    }, 500);
    this.setState({
      timerId,
      level: value,
    });
  }

  levelDecrement = () => {
    const {
      index,
      field,
      updateFacility,
    } = this.props;

    const {
      type,
      level,
    } = this.state;

    const intLevel = (parseInt(level, 10) || 0) - 1;
    if (intLevel >= 0) {
      updateFacility(field, type, index, intLevel);
      this.setState({ level: intLevel });
    }
  }

  levelIncrement = () => {
    const {
      index,
      field,
      updateFacility,
    } = this.props;

    const {
      max,
      type,
      level,
    } = this.state;

    const intLevel = (parseInt(level, 10) || 0) + 1;
    if (intLevel <= max) {
      updateFacility(field, type, index, intLevel);
      this.setState({ level: intLevel });
    }
  }
}


ListItem.propTypes = propTypes;

const mapDispatchToProps = (dispatch) => {
  return {
    updateFacility: (field, facilityType, index, level) => dispatch(updateFacility(field, facilityType, index, level)),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(ListItem);