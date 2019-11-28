import { actionTypes } from 'actions';
import createReducer from './createReducer';

const load = (_, { builds }) => {
  return builds;
};

const save = (builds, { build }) => {
  const { Id } = build.adventurer;
  return {
    ...builds,
    [Id]: build,
  };
};

const del = (builds, { id }) => {
  const { [id]: _, ...rest } = builds;
  if (Object.entries(rest).length === 0 && rest.constructor === Object) {
    return null;
  }

  return rest;
};

const saveReducer = createReducer({
  [actionTypes.LOAD_BUILDS]: load,
  [actionTypes.SAVE_BUILD]: save,
  [actionTypes.DEL_BUILD]: del,
});

export default saveReducer;
