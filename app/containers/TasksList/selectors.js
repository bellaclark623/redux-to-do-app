/**
 * The global state selectors
 */

import { createSelector } from "reselect";

const selectGlobal = state => state.get("tasks");

const getTasks = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.get("tasks").toJS()
  );

export { getTasks };
