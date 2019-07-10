/* eslint-disable no-unused-vars */
import React from 'react';
import classNames from 'classnames';
import { refs } from 'store';
import { connect } from 'react-redux';
import { Image, withTheme } from 'components';
import {
  scrollToComponent,
  selectFocus,
  selectStats,
  translate,
  getField,
} from 'actions';

class StatsAvatar extends React.Component {
  render() {
    let { lang, image, name, statsKey, scale } = this.props;

    const field = getField(statsKey);
    const label = name ? name[lang] : translate(statsKey, lang);
    const cn = classNames('avatar center', { scale });
    return (
      <div className={cn}>
        <Image field={field} image={image} size="lg" onClick={this.onClick} />
        <div className="caption ellipsis">{label}</div>
      </div>
    );
  }

  onClick = () => {
    const { scale, statsKey, selectFocus, selectStats } = this.props;
    if (!scale) selectStats(statsKey);
    selectFocus(statsKey);
    scrollToComponent(refs.bottom);
  };
}

const mapStateToProps = ({ focusKey, stats }, { statsKey }) => {
  return { scale: focusKey === statsKey && !stats[focusKey] };
};

const mapDispatchToProps = dispatch => {
  return {
    selectFocus: statsKey => dispatch(selectFocus(statsKey)),
    selectStats: statsKey => dispatch(selectStats(statsKey, null)),
  };
};

export default withTheme(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(StatsAvatar)
);
