import React from 'react';
import { connect } from 'react-redux';
import { HALIDOM_LIST } from 'data';
import HalidomItem from './HalidomItem';

function HalidomPanel({ element, weapon, dragonEle }) {
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
      {/* <HalidomSetting /> */}
      <div>
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

const actionCreators = {};

export default connect(mapStateToProps, actionCreators)(HalidomPanel);
