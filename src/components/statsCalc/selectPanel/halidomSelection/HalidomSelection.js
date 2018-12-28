import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import SlideItem from './SlideItem';

import { defaultHalidom, maxHalidom } from '../../../../redux/actions/actions';

import ui_content from '../../../../redux/store/data/ui_content';

const mapStateToProps = (state) => {
  return {
    language: state.language,
    halidom: state.halidom,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    defaultHalidom: () => dispatch(defaultHalidom()),
    maxHalidom: () => dispatch(maxHalidom()),
  }
}

class HalidomSelection extends Component {
  render() {
    const { language, halidom } = this.props;
    return (
      <Fragment>
        <button className="ui button" onClick={this.props.defaultHalidom}>{ui_content["default"][language]}</button>
        <button className="ui button" onClick={this.props.maxHalidom}>{ui_content["max"][language]}</button>
        <table className="ui single line table">
          <tbody>
            {Object.keys(halidom).map(field =>
              halidom[field] && halidom[field].id.map(index =>
                <SlideItem
                  key={field + index}
                  field={field}
                  index={index}
                  item={halidom[field][index]}
                />
              )
            )}
          </tbody>
        </table>
      </Fragment>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HalidomSelection);