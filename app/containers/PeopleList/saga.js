import { takeLatest } from "redux-saga";
import { put } from "redux-saga/effects";
import { DELETE_PERSON } from "./constants";
// import { removeAssigneeFromTasks } from "../TasksList/actions";
import { REMOVE_ASSIGNEE_FROM_TASKS } from "../TasksList/constants";

export function* deleteAssigneesOnPersonDelete(action) {
  yield put({
    type: REMOVE_ASSIGNEE_FROM_TASKS,
    payload: {
      uuid: action.payload.uuid
    }
  });
}

export default function* peopleListSagas() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(DELETE_PERSON, deleteAssigneesOnPersonDelete);
}
