import React, { memo } from 'react';
import { connect } from 'react-redux';
import locales from 'locales';
import { loadHalidom } from 'actions';
import { useEvent, saveState, removeState } from 'utils';
import { Image } from 'components';

const HalidomPanel = memo(function Panel(props) {
  const { btns, lang, halidom, loadHalidom } = props;

  const onClick = useEvent(e => {
    switch (e.currentTarget.name) {
      case 'del':
        removeState('halidom');
        break;
      case 'refresh':
        loadHalidom();
        break;
      case 'save':
        saveState('halidom', halidom);
        break;
      default:
        break;
    }
  });

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(40px, 1fr)',
        gridGap: '8px',
        height: '36px',
      }}
    >
      {btns.map(key => {
        const image = `icon/${key}`;
        const title = locales(key, lang);
        return (
          <button key={key} type="button" name={key} onClick={onClick}>
            <Image image={image} size="xs" title={title} />
          </button>
        );
      })}
    </div>
  );
});

const mapStateToProps = ({ halidom }) => {
  return { halidom };
};

const actionCreators = { loadHalidom };

export default connect(mapStateToProps, actionCreators)(HalidomPanel);
