/**
 * The global state selectors
 */

import { createSelector } from "reselect";

const selectGlobal = state => state.get("people");

const getPeople = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.get("people").toJS()
  );

export { getPeople };
