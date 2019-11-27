import React from 'react';
import { connect } from 'react-redux';
import { HALIDOM_LIST } from 'data';
import { loadHalidom } from 'actions';
import { saveState, removeState, useEvent } from 'utils';
import { BtnPanel } from 'components';
import HalidomItem from './HalidomItem';

const btns = ['del', 'refresh', 'save'];

function Halidom({ halidom, element, weapon, dragonEle, loadHalidom }) {
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

  if (!element) return null;

  let filters;
  if (element === dragonEle) {
    filters = [element, weapon];
  } else if (!dragonEle) {
    filters = [`adventurer_${element}`, weapon];
  } else {
    filters = [`adventurer_${element}`, weapon, `dragon_${dragonEle}`];
  }

  const arr = HALIDOM_LIST.filter(key => filters.some(f => key.includes(f)));

  return (
    <>
      <BtnPanel btns={btns} onClick={onClick} />
      <div className="list">
        {arr.map(key => (
          <HalidomItem key={key} halidomKey={key} />
        ))}
      </div>
    </>
  );
}
const mapStateToProps = ({ halidom, items: { adventurer, dragon } }) => {
  const { element, weapon } = adventurer || {};
  const { element: dragonEle } = dragon || {};
  return { halidom, element, weapon, dragonEle };
};

const mapDispatchToProps = { loadHalidom };

export default connect(mapStateToProps, mapDispatchToProps)(Halidom);
