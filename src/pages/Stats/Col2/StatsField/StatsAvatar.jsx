/* eslint-disable no-shadow */
import React from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { selectFocus, selectItem } from 'actions';
import { refs, getField, scrollTo, translate } from 'utils';
import { Image, Context } from 'components';

function StatsAvatar({
  image,
  name,
  scale,
  statsKey,
  setPanel,
  selectFocus,
  selectItem,
}) {
  const { lang } = React.useContext(Context);
  const field = getField(statsKey);

  const label = name ? name[lang] : translate(statsKey, lang);

  const cn = clsx('lg', { scale });

  const onClick = () => {
    if (!scale) {
      selectItem(statsKey);
    }

    setPanel('stats');
    selectFocus(statsKey);
    scrollTo(refs.col3);
  };

  return (
    <div>
      <Image
        field={field}
        image={image}
        size={cn}
        tabIndex="-1"
        onClick={onClick}
      />
      <div>{label}</div>
    </div>
  );
}

const mapStateToProps = ({ focused, stats }, { statsKey }) => {
  return { scale: focused === statsKey && !stats[statsKey] };
};

const actionCreators = {
  selectFocus,
  selectItem,
};

export default connect(
  mapStateToProps,
  actionCreators
)(StatsAvatar);
