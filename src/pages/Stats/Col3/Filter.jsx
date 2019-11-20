import React from 'react';
import { connect } from 'react-redux';
import { selectOption } from 'actions';
import { getFilterFields, useEvent } from 'utils';
import { CheckSet } from 'components';

function Filter(props) {
  const { fields, options, selectOption } = props;

  const handleChange = useEvent(e => {
    const { checked, name, value } = e.target;
    selectOption({ checked, name, value });
  });

  return (
    <>
      <div className="options">
        {fields.map(key => (
          <CheckSet
            icon
            key={key}
            group={key}
            options={options[key]}
            onChange={handleChange}
          />
        ))}
      </div>
    </>
  );
}

const mapStateToProps = state => {
  return {
    options: state.options,
    fields: getFilterFields(state),
  };
};

const actionCreators = {
  selectOption,
};

export default connect(mapStateToProps, actionCreators)(Filter);
