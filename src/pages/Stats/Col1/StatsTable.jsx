import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import locales from 'locales';
import { Checkbox } from 'components';
import { calcVal, getDetails, getPaperBGC } from 'utils';

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

function StatsTable({ disabled, details, expend, lang, theme, setExpend }) {
  const className = clsx({ expend });

  return (
    <div id="stats-table" className="paper" style={getPaperBGC(theme)}>
      <div id="header">
        <Checkbox
          lang={lang}
          disabled={disabled}
          title={locales('details', lang)}
          checked={expend}
          setChecked={setExpend}
        />
        <span>HP</span>
        <span>{locales('str', lang)}</span>
        <span>{locales('might', lang)}</span>
      </div>

      <div id="body" className={className}>
        {ROWS.map(key => {
          const { hp = '0', str = '0', might = '0' } = details[key] || {};
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
    theme: state.theme,
    details: getDetails(state),
  };
};

export default connect(mapStateToProps)(StatsTable);
