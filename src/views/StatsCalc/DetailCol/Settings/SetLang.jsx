import React from 'react';
import { withTheme } from 'components';
import { translate } from 'appRedux/actions';
import {
  FilledInput,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';

class DetailCol extends React.PureComponent {
  render() {
    const { lang } = this.props;

    return (
      <FormControl className="col-2" variant="filled">
        <InputLabel>{translate('language', lang)}</InputLabel>
        <Select value={lang} input={<FilledInput />} onChange={this.onChange}>
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="zh">简中</MenuItem>
          <MenuItem value="ja">日本語</MenuItem>
        </Select>
      </FormControl>
    );
  }

  onChange = ({ target: { value } }) => {
    if (this.props.lang !== value) {
      this.props.setLang(value);
    }
  };
}

export default withTheme(DetailCol);
