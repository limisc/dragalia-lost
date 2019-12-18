import React from 'react';
import { connect } from 'react-redux';
import { loadHalidom } from 'actions';
import {
  getFilteredHalidomKey,
  getPaperBGC,
  removeState,
  saveState,
  useEvent,
} from 'utils';
import { BtnPanel } from 'components';
import HalidomItem from './HalidomItem';

const btns = ['del', 'refresh', 'save'];

function Halidom({ halidom, keyList, theme, loadHalidom }) {
  const onClick = useEvent(e => {
    switch (e.currentTarget.name) {
      case 'del':
        removeState('dragalialost-halidom');
        break;
      case 'refresh':
        loadHalidom();
        break;
      case 'save':
        saveState('dragalialost-halidom', halidom);
        break;
      default:
        break;
    }
  });

  if (keyList === null) return null;

  return (
    <>
      <BtnPanel btns={btns} onClick={onClick} />
      <div className="list paper" style={getPaperBGC(theme)}>
        {keyList.map(key => (
          <HalidomItem key={key} halidomKey={key} />
        ))}
      </div>
    </>
  );
}

const mapStateToProps = state => {
  return {
    halidom: state.halidom,
    theme: state.theme,
    keyList: getFilteredHalidomKey(state),
  };
};

const mapDispatchToProps = { loadHalidom };

export default connect(mapStateToProps, mapDispatchToProps)(Halidom);
