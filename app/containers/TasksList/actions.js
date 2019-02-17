import { DELETE_TASK, UPDATE_EDITED_TASK, UPDATE_TASK } from "./constants";

export function deleteTask(uuid) {
  return {
    type: DELETE_TASK,
    payload: {
      uuid
    }
  };
}

export function updateEditedTask(edited, uuid) {
  return {
    type: UPDATE_EDITED_TASK,
    payload: {
      edited,
      uuid
    }
  };
}

export function updateTask(uuid) {
  return {
    type: UPDATE_TASK,
    payload: {
      uuid
    }
  };
}
