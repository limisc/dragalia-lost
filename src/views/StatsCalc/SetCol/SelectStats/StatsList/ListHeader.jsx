//@flow
/* eslint-disable no-unused-vars */
import React from 'react';
import { translate } from 'appRedux/actions';
import { withTheme } from 'components';

class ListHeader extends React.PureComponent {
  render() {
    const { lang, fields } = this.props;
    return (
      <div className="list-header flex">
        <div className="list-item-image" />

        <div className="list-item-name ellipsis">{translate('name', lang)}</div>

        {fields.map(field => {
          if (field === 'rarity') {
            return (
              <div key={field} className="list-item-res ellipsis">
                {translate('rarity', lang)}
              </div>
            );
          }

          return <div key={field} className="list-item-icon" />;
        })}
      </div>
    );
  }
}

export default withTheme(ListHeader);
