//@flow
/* eslint-disable no-unused-vars */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { getSelectKey } from 'appRedux/actions';
import Controls from './Controls';
import Overview from './Overview';
import Field from './Field';

class SetHalidom extends React.Component {
  state = {
    fields: ['element', 'weapon', 'dragon'],
  };

  render() {
    const { fields } = this.state;
    return (
      <Fragment>
        <Controls />
        <table>
          <tbody>
            {fields.map(fKey => {
              // fKey: field key
              const sKey = this.props[fKey];
              return (
                <Overview key={`overview_${fKey}`} fKey={fKey} sKey={sKey} />
              );
            })}
          </tbody>
        </table>
        <div className="halidom">
          {fields.map(fKey => {
            // fKey: field Key
            // sKey: section Key
            const sKey = this.props[fKey];
            // TODO change div to table
            return sKey ? (
              <Field key={`${fKey}_${sKey}`} fKey={fKey} sKey={sKey} />
            ) : (
              undefined
            );
          })}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ stats }) => {
  return getSelectKey(stats);
};

export default connect(mapStateToProps)(SetHalidom);
