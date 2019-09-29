import React from 'react';
import { connect } from 'react-redux';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import clsx from 'clsx';
import { HalidomSetting, Input } from 'components';
import { HALIDOM_LIST } from 'data';
import { updateSetting } from 'actions';
import { useEventCallback } from 'utils';

const arr = ['smithy', 'dragontree', 'dracolith', 'rupie'];

// eslint-disable-next-line no-shadow
function Setting({ halidom, updateSetting }) {
  const [collapse, setCollapse] = React.useState(false);

  const handleCollapse = e => {
    setCollapse(e.target.checked);
  };

  const level = React.useMemo(() => {
    let sum =
      Number(halidom.dracolith) +
      Number(halidom.dragontree) +
      Number(halidom.smithy) +
      Number(halidom.rupie);

    for (let i = 0; i < HALIDOM_LIST.length; i += 1) {
      const key = HALIDOM_LIST[i];
      sum += halidom[key].level;
    }
    return sum;
  }, [halidom]);

  const onChange = useEventCallback(e => {
    const { name, value } = e.target;
    updateSetting({ name, value: parseInt(value, 10) || '' });
  });

  const cn = clsx('col-2', 'animated-collapse', { collapse: !collapse });

  return (
    <>
      <HalidomSetting />

      <div className="col-2">
        {/* <Checkbox
          checked={collapse}
          icon={false}
          label="setting"
          setChecked={setCollapse}
        /> */}

        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              checked={collapse}
              onChange={handleCollapse}
            />
          }
          label="setting"
        />

        <div className="center">Total : {level}</div>
      </div>

      <div className={cn}>
        {arr.map(key => {
          return (
            <Input
              key={key}
              label={key}
              value={halidom[key]}
              onChange={onChange}
            />
          );
        })}
      </div>
    </>
  );
}

const mapStateToProps = ({ halidom }) => {
  return { halidom };
};

const actionCreators = { updateSetting };

export default connect(
  mapStateToProps,
  actionCreators
)(Setting);
