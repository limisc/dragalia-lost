import React from 'react';
import { connect } from 'react-redux';
import { HalidomItem, IconBtns } from 'components';
import { HALIDOM_LIST } from 'data';
import { loadHalidom } from 'actions';
import { saveState, removeState } from 'utils';

const btns = ['del', 'refresh', 'save'];

// eslint-disable-next-line no-shadow
function PanelHalidom({ element, weapon, dragonEle, halidom, loadHalidom }) {
  const onClick = e => {
    switch (e.currentTarget.name) {
      case 'del': {
        removeState('halidom');
        break;
      }
      case 'refresh': {
        loadHalidom();
        break;
      }
      case 'save': {
        saveState('halidom', halidom);
        break;
      }
      default:
        break;
    }
  };

  if (!element) return null;

  let filters;

  if (element === dragonEle) {
    filters = [element, weapon];
  } else if (!dragonEle) {
    filters = [`adventurer_${element}`, weapon];
  } else {
    filters = [`adventurer_${element}`, weapon, `dragon_${dragonEle}`];
  }

  const halidomList = HALIDOM_LIST.filter(halidomKey =>
    filters.some(f => halidomKey.includes(f))
  );

  return (
    <>
      <IconBtns btns={btns} onClick={onClick} />
      <div>
        {halidomList.map(k => (
          <HalidomItem key={k} itemKey={k} />
        ))}
      </div>
    </>
  );
}

const mapStateToProps = ({ stats: { adventurer, dragon }, halidom }) => {
  const { element, weapon } = adventurer || {};
  const { element: dragonEle } = dragon || {};
  return { element, weapon, dragonEle, halidom };
};

const actionCreators = {
  loadHalidom,
};

export default connect(
  mapStateToProps,
  actionCreators
)(PanelHalidom);
