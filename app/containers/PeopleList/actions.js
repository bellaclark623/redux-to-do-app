import {
  UPDATE_PERSON,
  UPDATE_EDITED_PERSON,
  DELETE_PERSON
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
