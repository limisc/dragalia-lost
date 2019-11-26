import React from 'react';
import { connect } from 'react-redux';
import { HALIDOM_LIST } from 'data';
import HalidomItem from './HalidomItem';
import HalidomPanel from './HalidomPanel';

function Halidom({ element, weapon, dragonEle }) {
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
      <HalidomPanel btns={['del', 'refresh', 'save']} />
      <div className="list">
        {arr.map(key => (
          <HalidomItem key={key} halidomKey={key} />
        ))}
      </div>
    </>
  );
}
const mapStateToProps = ({ items: { adventurer, dragon } }) => {
  const { element, weapon } = adventurer || {};
  const { element: dragonEle } = dragon || {};
  return { element, weapon, dragonEle };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Halidom);
