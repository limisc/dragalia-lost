import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import locales from 'locales';
import { calcVal, getDetails } from 'utils';

const ROWS = [
  'adventurer',
  'weapon',
  'wyrmprint1',
  'wyrmprint2',
  'dragon',
  'augments',
  'ability',
  'halidom',
];

function StatsTable({ details, expend, lang }) {
  const className = clsx({ expend });

  return (
    <div id="stats-table">
      <div id="header">
        <span />
        <span>HP</span>
        <span>{locales('str', lang)}</span>
        <span>{locales('might', lang)}</span>
      </div>

      <div id="body" className={className}>
        {ROWS.map(key => {
          const { hp, str, might } = details[key];
          return (
            <Fragment key={key}>
              <span>{locales(key, lang)}</span>
              <span>{hp}</span>
              <span>{str}</span>
              <span>{might}</span>
            </Fragment>
          );
        })}
      </div>

      <div id="footer" className={className}>
        <span>{locales('total', lang)}</span>
        <span>{calcVal(details.total.hp)}</span>
        <span>{calcVal(details.total.str)}</span>
        <span>{details.total.might}</span>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    details: getDetails(state),
  };
};

export default connect(mapStateToProps)(StatsTable);
