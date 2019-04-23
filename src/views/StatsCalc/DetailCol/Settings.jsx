//@flow
/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import { withTheme } from 'components';
import { reset, translate } from 'appRedux/actions';
import {
  FilledInput,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
} from '@material-ui/core';

class Settings extends React.PureComponent {
  render() {
    const { lang, open, reset, toggle } = this.props;

    return (
      <div className="select flex">
        <FormControl className="col-2 col-4" variant="filled">
          <InputLabel>{translate('language', lang)}</InputLabel>
          <Select value={lang} input={<FilledInput />} onChange={this.onChange}>
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="ja">日本語</MenuItem>
            <MenuItem value="zh">简中</MenuItem>
          </Select>
        </FormControl>
        <Button
          className="col-2 col-4 reset"
          variant="contained"
          onClick={reset}
        >
          {translate('reset', lang)}
        </Button>

        <Button
          name="0"
          className={
            open ? 'col-2 col-4 section active' : 'col-2 col-4 section'
          }
          variant="contained"
          onClick={this.onClick}
        >
          {translate('stats', lang)}
        </Button>

        <Button
          name="1"
          className={
            open ? 'col-2 col-4 section' : 'col-2 col-4 section active'
          }
          variant="contained"
          onClick={this.onClick}
        >
          {translate('dungeon', lang)}
        </Button>
      </div>
    );
  }

  onChange = ({ target: { value } }) => {
    if (this.props.lang !== value) {
      this.props.setLang(value);
    }
  };

  onClick = e => {
    const open = e.currentTarget.name === '0';
    if (open !== this.props.open) {
      this.props.toggle(open);
    }
  };
}

const mapDispatchToProps = dispatch => {
  return {
    reset: () => dispatch(reset()),
  };
};

export default withTheme(
  connect(
    null,
    mapDispatchToProps
  )(Settings)
);
