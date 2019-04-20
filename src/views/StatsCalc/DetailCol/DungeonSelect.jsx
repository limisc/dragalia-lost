//@flow
/* eslint-disable no-unused-vars */
import React from 'react';
import {
  FilledInput,
  FormControl,
  InputLabel,
  Select,
} from '@material-ui/core';
import { dungeonInfo } from 'data';
import { withTheme } from 'components';
import { translate } from 'appRedux/actions';

class DungeonSelect extends React.PureComponent {
  state = {
    dungeonOptions: [],
    dungeonBanners: [],
  };

  componentDidMount() {
    const width = window.innerWidth;
    console.log(width);
    const dungeonOptions = Object.keys(dungeonInfo);
    const dungeonBanners = dungeonOptions.map(opt => {
      return (
        <li key={opt} value={opt}>
          <img
            className='test'
            style={{
              width: `calc((${width}px - 8px * 2) / 3 - 44px)`,
            }}
            alt={opt}
            src={`${process.env.PUBLIC_URL}/images/dungeon/${opt}.png`}
          />
        </li>
      );
    });
    this.setState({ dungeonOptions, dungeonBanners });
  }

  render() {
    const { lang, dungeon, onChange } = this.props;
    const { dungeonOptions, dungeonBanners } = this.state;
    return (
      <FormControl className="fluid" variant="filled">
        <InputLabel>{translate('dungeon', lang)}</InputLabel>
        <Select
          value={dungeon}
          onChange={onChange}
          input={<FilledInput name="dungeon" />}
        >
          {dungeonBanners}
        </Select>
      </FormControl>
    );
  }
}

export default withTheme(DungeonSelect);
