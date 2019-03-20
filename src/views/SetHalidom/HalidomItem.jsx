// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Grid,
  Typography,
} from '@material-ui/core';
import names from "intl/facility";
import {
  getLimit,
  updateHalidom,
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

    const { type, level } = props.facility;
    const max = getLimit(type);
    this.state = {
      max,
      level,
    };
  }

  render() {
    const {
      facility: { id, image },
      lang = "en",
    } = this.props;

    const {
      max,
      level,
    } = this.state;
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
      updateHalidom,
    } = this.props;

    let {
      timerId,
    } = this.state;
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      updateHalidom(field, index, value);
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
      updateHalidom,
    } = this.props;

    const {
      level,
    } = this.state;

    const intLevel = (parseInt(level, 10) || 0) - 1;
    if (intLevel >= 0) {
      updateHalidom(field, index, intLevel);
      this.setState({ level: intLevel });
    }
  }

  levelIncrement = () => {
    const {
      index,
      field,
      updateHalidom,
    } = this.props;

    const {
      max,
      level,
    } = this.state;

    const intLevel = (parseInt(level, 10) || 0) + 1;
    if (intLevel <= max) {
      updateHalidom(field, index, intLevel);
      this.setState({ level: intLevel });
    }
  }
}


ListItem.propTypes = propTypes;

const mapDispatchToProps = (dispatch) => {
  return {
    updateHalidom: (field, index, level) => dispatch(updateHalidom(field, index, level)),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(ListItem);