//@flow
/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import { Image, withTheme } from 'components';
import { getDir, selectFocus, translate } from 'appRedux/actions';

class StatsAvatar extends React.Component {
  render() {
    let { lang, image, name, statsKey, focus } = this.props;

    const dir = getDir(statsKey);
    const label = name ? name[lang] : translate(statsKey, lang);
    const cn = focus ? 'avatar center list-item' : 'avatar center';
    // TODO caption
    return (
      <div className={cn}>
        <Image size="lg" dir={dir} image={image} onClick={this.onClick} />
        <span className="caption">{label}</span>
      </div>
    );
  }

  onClick = () => {
    const { statsKey, selectFocus } = this.props;
    selectFocus(statsKey);
  };
}

const mapStateToProps = ({ focusKey, stats }, { statsKey }) => {
  return { focus: focusKey === statsKey && !stats[focusKey] };
};

const mapDispatchToProps = dispatch => {
  return {
    selectFocus: statsKey => dispatch(selectFocus(statsKey)),
  };
};

export default withTheme(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(StatsAvatar)
);
