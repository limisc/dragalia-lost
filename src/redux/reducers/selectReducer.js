

//  // action: { section, status }
//  const { status } = action;
//  const { type, element } = status;

//  let new_state = {
//    ...state,
//    [section]: status,
//    calcStatus: {
//      ...state.calcStatus,
//      [section]: {
//        HP: calcStats(section, status, "HP"),
//        STR: calcStats(section, status, "STR"),
//      }
//    }
//  }
//  /*************************************************************************************************/
//  if (section === "adventurer") {
//    let facility = { ...RESET_FACILITY, type, element };
//    //if status[element/type] === state.facility[element/type], then keep the value, otherwise reset.
//    if (element === state.facility.element) {
//      facility = { ...facility, altar: state.facility.altar };
//    }
//    if (type === state.facility.type) {
//      facility = { ...facility, dojo: state.facility.dojo };

//    }
//    //if status.element has extra facility, then add it.
//    if (EXTRA_FACILITY[element]) {
//      const { typeList, ...rest } = EXTRA_FACILITY[element];
//      facility = { ...facility, typeList: [...facility.typeList, ...typeList], ...rest };
//    }

//    new_state = {
//      ...new_state,
//      facility

//    };