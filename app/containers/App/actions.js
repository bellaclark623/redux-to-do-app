import {
  UPDATE_PERSON,
  UPDATE_EDITED_PERSON,
  DELETE_PERSON,
  DELETE_TASK,
  UPDATE_EDITED_TASK,
  UPDATE_TASK
} from "./constants";

export function updatePerson(uuid) {
  return {
    type: UPDATE_PERSON,
    payload: {
      uuid
    }
  };
}

export function updateEditedPerson(edited, uuid) {
  return {
    type: UPDATE_EDITED_PERSON,
    payload: {
      edited,
      uuid
    }
  };
}

export function deletePerson(uuid) {
  return {
    type: DELETE_PERSON,
    payload: {
      uuid
    }
  };
}

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
