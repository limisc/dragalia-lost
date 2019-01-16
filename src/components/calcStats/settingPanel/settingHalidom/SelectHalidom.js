import React from 'react';
import { connect } from 'react-redux';

import { translate, defaultHalidom, maxHalidom } from "../../../../redux/actions/actions";
import Facility from './Facility';

const mapStateToProps = (state) => {
  return {
    language: state.language,
    halidom: state.halidom,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    defaultLv: () => dispatch(defaultHalidom()),
    maxLv: () => dispatch(maxHalidom()),
  }
}

const SelectHalidom = ({ language, halidom, defaultLv, maxLv }) => {
  return (
    <div className="six wide column">
      <button className="ui button" onClick={defaultLv}>{translate("default", language)}</button>
      <button className="ui button" onClick={maxLv}>{translate("max", language)}</button>
      <table className="ui single line table">
        <tbody>
          {["element", "weapon", "dragon"].map(f =>
            halidom[f] && halidom[f].list.map(i =>
              <Facility
                key={f + i}
                field={f}
                index={i}
                item={halidom[f][i]}
              />
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectHalidom);