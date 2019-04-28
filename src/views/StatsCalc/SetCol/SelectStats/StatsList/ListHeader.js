/* eslint-disable no-unused-vars */
import React from 'react';
import { translate } from 'actions';
import { withTheme } from 'components';

class ListHeader extends React.PureComponent {
  render() {
    const { lang, fields } = this.props;
    return (
      <div className="list-header flex highlight">
        <div className="list-item-image" />

        <div className="list-item-name">{translate('name', lang)}</div>

        {fields.map(f => {
          if (f === 'rarity') {
            return (
              <div key={f} className="list-item-res ellipsis">
                {translate('rarity', lang)}
              </div>
            );
          }

          return <div key={f} className="list-item-icon" />;
        })}
      </div>
    );
  }
}

export default withTheme(ListHeader);
