import React, { Fragment, useMemo } from 'react';
import clsx from 'clsx';
import { Context } from 'components';
import { calcVal, translate } from 'utils';

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

function StatsTable({ collapse, details }) {
  const { lang } = React.useContext(Context);

  const { body, footer } = useMemo(
    () => ({
      body: clsx('body', { collapse }),
      footer: clsx('footer', { collapse }),
    }),
    [collapse]
  );

  if (!details) return null;

  return (
    <div id="stats-table">
      <div className="header">
        <span />
        <span>HP</span>
        <span>{translate('str', lang)}</span>
        <span>{translate('might', lang)}</span>
      </div>

      <div className={body}>
        {ROWS.map(row => {
          const { hp, str, might } = details[row];
          return (
            <Fragment key={row}>
              <span>{translate(row, lang)}</span>
              <span>{hp}</span>
              <span>{str}</span>
              <span>{might}</span>
            </Fragment>
          );
        })}
      </div>

      <div className={footer}>
        <span>{translate('total', lang)}</span>
        <span>{calcVal(details.total.hp)}</span>
        <span>{calcVal(details.total.str)}</span>
        <span>{details.total.might}</span>
      </div>
    </div>
  );
}

export default React.memo(StatsTable);
