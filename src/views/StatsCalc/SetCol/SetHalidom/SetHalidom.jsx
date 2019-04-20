//@flow
/* eslint-disable no-unused-vars */
import React from 'react';
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
      <>
        <Controls />
        <table>
          <tbody>
            {this.state.fields.map(fKey => {
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
      </>
    );
  }
}

const mapStateToProps = ({ stats }) => {
  return getSelectKey(stats);
};

const mapDispatchToProps = dispatch => {
  return {
    // TODO clear
    //: () => dispatch(),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetHalidom);
