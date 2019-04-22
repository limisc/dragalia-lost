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
    const { lang, reset } = this.props;

    return (
      <div className="flex">
        <FormControl className="col-2" variant="filled">
          <InputLabel>{translate('language', lang)}</InputLabel>
          <Select value={lang} input={<FilledInput />} onChange={this.onChange}>
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="zh">简中</MenuItem>
            <MenuItem value="ja">日本語</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" className="col-2" onClick={reset}>
          {translate('reset', lang)}
        </Button>
      </div>
    );
  }

  onChange = ({ target: { value } }) => {
    if (this.props.lang !== value) {
      this.props.setLang(value);
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
