import React from 'react';
import { connect } from 'react-redux';
import { loadHalidom } from 'actions';
import { removeState, saveState, useEventCallback } from 'utils';
import IconBtns from './IconBtns';

const btns = ['del', 'refresh', 'save'];

// eslint-disable-next-line no-shadow
function HalidomSetting({ halidom, loadHalidom }) {
  const onClick = useEventCallback(e => {
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
  return <IconBtns btns={btns} onClick={onClick} />;
}

const mapStateToProps = ({ halidom }) => {
  return { halidom };
};

const actionCreators = { loadHalidom };

export default connect(
  mapStateToProps,
  actionCreators
)(HalidomSetting);
