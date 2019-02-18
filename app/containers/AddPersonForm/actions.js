import { ADD_PERSON } from "../PeopleList/constants";

export function addPerson(newPerson) {
  return {
    type: ADD_PERSON,
    payload: { newPerson }
  };
}
