import {
  actionTypes,
  getFacilityValue,
  reducerCreator,
} from "actions";



const resetField = (halidom, action) => {
  const { field } = action;
  if (!halidom[field]) {
    return halidom;
  }

  return {
    ...halidom,
    [field]: null,
  };
}

const updateFacility = (halidom, action) => {
  const {
    index,
    field,
    facilityType,
    level,
  } = action;
  const value = getFacilityValue(facilityType, level);

  return {
    ...halidom,
    [field]: {
      ...halidom[field],
      [index]: value,
    },
  };
}

const halidomReducer = reducerCreator({
  [actionTypes.RESET_FIELD]: resetField,
  [actionTypes.UPDATE_FACILITY]: updateFacility,
});

export default halidomReducer;