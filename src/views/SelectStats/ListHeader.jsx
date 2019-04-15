// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { translate } from "actions";

const propTypes = {
  fields: PropTypes.array.isRequired,
  lang: PropTypes.string,
};

const defaultProps = {
  lang: "en",
};


class ListHeader extends React.PureComponent {

  render() {
    const {
      fields,
      lang,
    } = this.props;
    return (
      <div className="list-header center">
        <div className="stats-list-image">
        </div>

        <div className="stats-list-name text">
          {translate("name", lang)}
        </div>

        {fields.map((field) => {
          if (field === "rarity") {
            return (
              <div key={field} className="stats-list-icon center">
                {translate("rarity", lang)}
              </div>
            );
          }

          return (
            <div key={field} className="stats-list-icon">
            </div>
          );
        })}

      </div>
    );
  }
}


ListHeader.propTypes = propTypes;
ListHeader.defaultProps = defaultProps;

export default ListHeader;